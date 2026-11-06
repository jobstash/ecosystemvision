/* eslint-disable @typescript-eslint/no-var-requires */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const ts = require('typescript');
const { organization } = require('./fixtures/sentry-responses');

const root = path.resolve(__dirname, '../../src');

// Load the real request, parser, and data adapter without booting Next or Sentry.
const loadAPI = (fetchResponse) => {
  const modules = new Map();
  const requests = [];
  const diagnostics = [];
  const missing = new Error('NEXT_HTTP_ERROR_FALLBACK;404');
  const load = (filename) => {
    if (modules.has(filename)) return modules.get(filename).exports;
    const loaded = { exports: {} };
    modules.set(filename, loaded);
    const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      fileName: filename,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
      },
    }).outputText;
    const resolve = (name) => {
      if (name === 'next/navigation') {
        return { notFound: () => { throw missing; } };
      }
      if (name === '@/shared/core/envs') {
        return {
          MW_URL: 'http://127.0.0.1:4319',
          FRONTEND_URL: 'https://ecosystem.example',
          PAGE_SIZE: '20',
        };
      }
      if (name === '@/shared/utils/sentry-message') {
        return { sentryMessage: (...args) => diagnostics.push(args) };
      }
      // Exercise the real route, metadata, page, and API adapters. Leaf UI
      // components are not rendered by this server-contract harness.
      if (name.startsWith('@/') && name.includes('/components/')) {
        return new Proxy({}, { get: () => () => null });
      }
      if (name.startsWith('@/')) {
        const base = path.join(root, name.slice(2));
        return load(`${base}${fs.existsSync(`${base}.ts`) ? '.ts' : '.tsx'}`);
      }
      if (name.startsWith('.')) {
        return load(path.resolve(path.dirname(filename), `${name}.ts`));
      }
      return require(name);
    };
    const fetch = async (url, options) => {
      const parsed = new URL(url, 'https://ecosystem.example');
      requests.push({ url: parsed, input: url, options });
      return fetchResponse(parsed);
    };
    new Function('module', 'exports', 'require', 'fetch', source)(
      loaded, loaded.exports, resolve, fetch,
    );
    return loaded.exports;
  };
  return {
    ...load(path.join(root, 'search/data/get-pillar-info.ts')),
    ...load(path.join(root, 'orgs/data/get-org-details.ts')),
    ...load(path.join(root, 'funds/data/get-fund-list.ts')),
    ...load(path.join(root, 'funds/data/get-fund-sectors.ts')),
    ...load(path.join(root, 'funds/data/get-fund-round-stages.ts')),
    ...load(path.join(root, 'shared/utils/mw-get.ts')),
    ...load(path.join(root, 'shared/core/errors.ts')),
    loadPillarRoute: (nav) =>
      load(path.join(root, `app/${nav}/[pillar]/[item]/page.tsx`)),
    missing,
    requests,
    diagnostics,
  };
};

const props = {
  nav: 'organizations',
  pillar: 'tags',
  item: 'polarion',
  searchParams: {},
};

const found = {
  success: true,
  message: 'Retrieved pillar info successfully',
  data: {
    title: 'Organizations using Polarion',
    description: 'Organizations using Polarion.',
    activePillar: { slug: 'tags', items: ['Polarion'] },
    altPillars: [{ slug: 'investors', items: ['Example Investor'] }],
  },
};

test('A9: successful missing pillar is a route 404, not a schema/server error', async () => {
  const { getPillarInfo, missing, diagnostics } = loadAPI(() =>
    Response.json({ success: true, message: 'Pillar not found', data: null }),
  );
  await assert.rejects(getPillarInfo(props), (error) => error === missing);
  assert.deepEqual(diagnostics, []);
});

test('A9: real metadata and page entrypoints propagate the same missing/error contract', async () => {
  const cases = [
    { payload: { success: true, message: 'Pillar not found', data: null }, missing: true },
    { payload: { success: false, message: 'Error searching pillar', data: null } },
    { payload: { success: true, message: 'Retrieved pillar info successfully', data: {} } },
    { payload: { success: true, message: 'Pillar not found', data: null }, status: 503 },
  ];
  for (const nav of ['organizations', 'projects']) {
    for (const scenario of cases) {
      for (const entrypoint of ['metadata', 'page']) {
        const api = loadAPI((url) => url.pathname.endsWith('/labels')
          ? Response.json({ data: [] })
          : Response.json(scenario.payload, { status: scenario.status ?? 200 }));
        const route = api.loadPillarRoute(nav);
        // The item is the exact route in A9 event 50bd062e82964b0eb34bf7e0148d2e68.
        const routeProps = {
          params: Promise.resolve({ pillar: 'tags', item: 'product-activation' }),
          searchParams: Promise.resolve({}),
        };
        const invoke = async () => {
          if (entrypoint === 'metadata') return route.generateMetadata(routeProps);
          const page = await route.default(routeProps);
          return page.type(page.props);
        };
        await assert.rejects(invoke, (error) => {
          if (scenario.missing) return error === api.missing;
          assert.notEqual(error, api.missing);
          if (scenario.status) {
            assert.ok(error instanceof api.ResponseError);
            assert.equal(error.res.status, scenario.status);
          } else if (scenario.payload.success) {
            assert.ok(error instanceof api.ResponseError);
            assert.match(error.message, /Invalid response schema/);
          } else {
            assert.equal(error.message, scenario.payload.message);
          }
          return true;
        }, `${nav} ${entrypoint} ${JSON.stringify(scenario)}`);
        const request = api.requests.find(({ url }) => url.pathname === '/search/pillar');
        assert.equal(request.url.searchParams.get('nav'), nav);
        assert.equal(request.url.searchParams.get('item'), 'product-activation');
        assert.equal(request.url.searchParams.get('tags'), 'product-activation');
        assert.deepEqual(api.diagnostics, []);
      }
    }
  }
});

test('real pillar metadata preserves the title, description, canonical URL and filters', async () => {
  for (const nav of ['organizations', 'projects']) {
    const api = loadAPI(() => Response.json(found));
    const metadata = await api.loadPillarRoute(nav).generateMetadata({
      params: Promise.resolve({ pillar: props.pillar, item: props.item }),
      searchParams: Promise.resolve({ tags: 'typescript' }),
    });
    assert.deepEqual(metadata, {
      title: found.data.title,
      description: found.data.description,
      alternates: { canonical: `https://ecosystem.example/${nav}/tags/polarion` },
    });
    assert.equal(api.requests[0].url.searchParams.get('tags'), 'polarion,typescript');
  }
});

test('AA: label lookup failures remain upstream errors even when the pillar exists', async () => {
  const api = loadAPI((url) => url.pathname.endsWith('/labels')
    ? Response.json({ message: 'Unavailable' }, { status: 503 })
    : Response.json(found));
  const route = api.loadPillarRoute('organizations');
  const page = await route.default({
    params: Promise.resolve({ pillar: 'investors', item: 'sapphire-ventures' }),
    searchParams: Promise.resolve({ investors: 'comcast,matrix-capital-management,irongrey' }),
  });
  await assert.rejects(page.type(page.props), (error) => {
    assert.ok(error instanceof api.ResponseError);
    assert.notEqual(error, api.missing);
    assert.equal(error.res.status, 503);
    assert.match(error.message, /getPillarLabels \(503 \/search\/pillar\/labels\)/);
    return true;
  });
});

test('valid organization and project pillars retain metadata and active filters', async () => {
  for (const nav of ['organizations', 'projects']) {
    const { getPillarInfo, requests } = loadAPI(() => Response.json(found));
    const result = await getPillarInfo({
      ...props,
      nav,
      searchParams: { tags: 'typescript', investors: 'example-investor' },
    });
    assert.deepEqual(result, {
      title: found.data.title,
      description: found.data.description,
      mainPillar: found.data.activePillar,
      altPillars: found.data.altPillars,
    });
    assert.equal(requests.length, 1);
    assert.equal(requests[0].url.pathname, '/search/pillar');
    assert.equal(requests[0].url.searchParams.get('nav'), nav);
    assert.equal(requests[0].url.searchParams.get('tags'), 'polarion,typescript');
    assert.equal(requests[0].url.searchParams.get('investors'), 'example-investor');
    assert.equal(requests[0].options.cache, 'no-store');
  }
});

test('backend failure envelopes remain errors even when their data is absent or null', async () => {
  for (const payload of [
    { success: false, message: 'Error searching pillar' },
    { success: false, message: 'Error searching pillar', data: null },
  ]) {
    const { getPillarInfo, missing } = loadAPI(() => Response.json(payload));
    await assert.rejects(getPillarInfo(props), (error) =>
      error !== missing && error.message === payload.message,
    );
  }
});

test('malformed successful data is not mistaken for a missing pillar', async () => {
  for (const payload of [
    { success: true, message: 'Retrieved pillar info successfully' },
    { success: true, message: 'Retrieved pillar info successfully', data: {} },
    { ...found, data: { ...found.data, title: null } },
  ]) {
    const { getPillarInfo, missing, diagnostics, ResponseError } = loadAPI(() =>
      Response.json(payload),
    );
    await assert.rejects(getPillarInfo(props), (error) => {
      assert.notEqual(error, missing);
      assert.ok(error instanceof ResponseError);
      assert.match(error.message, /getPillarInfo \(200 \/search\/pillar\)/);
      assert.match(error.message, /Invalid response schema/);
      assert.ok(JSON.parse(error.info).details.length > 0);
      return true;
    });
    assert.equal(diagnostics.length, 0);
  }
});

test('HTTP 404 remains missing; HTTP 400/500/503 retain response status', async () => {
  for (const status of [400, 404, 500, 503]) {
    const { getPillarInfo, missing, ResponseError, diagnostics } = loadAPI(() =>
      Response.json({ message: 'private upstream body' }, { status }),
    );
    await assert.rejects(getPillarInfo(props), (error) => {
      if (status === 404) return error === missing;
      assert.ok(error instanceof ResponseError);
      assert.equal(error.res.status, status);
      assert.match(error.message, new RegExp(`${status} /search/pillar`));
      assert.doesNotMatch(error.message, /private upstream body/);
      return true;
    });
    assert.deepEqual(diagnostics, []);
  }
});

test('network failures retain the original error and cause', async () => {
  const cause = new Error('ECONNREFUSED');
  const failure = new TypeError('fetch failed', { cause });
  const { getPillarInfo } = loadAPI(() => { throw failure; });
  await assert.rejects(getPillarInfo(props), (error) => {
    assert.equal(error, failure);
    assert.equal(error.cause, cause);
    return true;
  });
});

test('malformed JSON reports the response category without exposing the body', async () => {
  const { getPillarInfo, ResponseError } = loadAPI(() =>
    new Response('<html>private-upstream-body</html>', {
      headers: { 'content-type': 'text/html' },
    }),
  );
  await assert.rejects(getPillarInfo(props), (error) => {
    assert.ok(error instanceof ResponseError);
    assert.match(error.message, /Invalid JSON Response/);
    assert.doesNotMatch(error.message, /private-upstream-body/);
    return true;
  });
});

test('schema diagnostics retain code and path, never URL credentials or payload values', async () => {
  const { mwGET, ResponseError } = loadAPI(() =>
    Response.json({ secret: 'private-payload-value' }),
  );
  const schema = require('zod').z.object({ secret: require('zod').z.number() });
  await assert.rejects(mwGET({
    url: 'https://user:private-password@example.invalid/organizations/details/90001?token=private-token',
    label: 'getOrgDetails',
    responseSchema: schema,
  }), (error) => {
    assert.ok(error instanceof ResponseError);
    assert.match(error.message, /200 \/organizations\/details\/90001/);
    assert.deepEqual(JSON.parse(error.info), {
      details: [{ code: 'invalid_type', path: ['secret'] }],
    });
    assert.doesNotMatch(error.message + error.info, /private-password|private-token|private-payload-value/);
    return true;
  });
});

test('upstream responses remain accessible without leaking through error inspection', async () => {
  const response = Response.json({ secret: 'private-body' }, {
    status: 503,
    headers: { 'set-cookie': 'private-cookie' },
  });
  Object.defineProperty(response, 'url', {
    value: 'https://user:private-password@example.invalid/search/pillar?token=private-token',
  });
  const { getPillarInfo, ResponseError } = loadAPI(() => response);
  let failure;
  await assert.rejects(getPillarInfo(props), (error) => {
    failure = error;
    assert.ok(error instanceof ResponseError);
    assert.equal(error.res, response);
    assert.equal(error.res.status, 503);
    assert.equal(Object.prototype.propertyIsEnumerable.call(error, 'res'), false);
    assert.doesNotMatch(require('node:util').inspect(error), /private-|token=|set-cookie/);
    return true;
  });
  assert.deepEqual(await failure.toJSON(), {
    message: 'getPillarInfo (503 /search/pillar): Non 200 Response',
    info: null,
    status: 503,
    contentType: 'application/json',
  });
});

test('AP: organization details accept imported job IDs and UUIDs unchanged', async () => {
  const { getOrgDetails } = loadAPI(() => Response.json(organization));
  const result = await getOrgDetails('source-id-org');
  assert.deepEqual(result.jobs.map(({ id }) => id), organization.jobs.map(({ id }) => id));
  assert.equal(result.name, organization.name);
});

test('AP: empty, numeric, or missing job IDs still fail the detail contract', async () => {
  for (const id of ['', 4822638008, undefined]) {
    const { getOrgDetails, ResponseError } = loadAPI(() => Response.json({
      ...organization,
      jobs: [{ ...organization.jobs[0], id }],
    }));
    await assert.rejects(getOrgDetails('source-id-org'), (error) => {
      assert.ok(error instanceof ResponseError);
      assert.deepEqual(JSON.parse(error.info).details[0].path, ['jobs', 0, 'id']);
      return true;
    });
  }
});

test('relative funds requests preserve fetch URLs and successful response parsing', async () => {
  const cases = [
    ['getFundList', [2, { query: 'private-filter' }], '/api/funds/list?query=private-filter&limit=20&page=2', { page: 2, count: 0, total: 0, data: [] }],
    ['getFundSectors', [{}], '/api/funds/sectors', []],
    ['getFundRoundStages', [{}], '/api/funds/rounds', []],
  ];
  for (const [method, args, input, payload] of cases) {
    const api = loadAPI(() => Response.json(payload));
    const result = await api[method](...args);
    assert.deepEqual(result, payload);
    assert.equal(api.requests[0].input, input);
    assert.equal(api.requests[0].options.cache, 'no-store');
  }
});

test('relative funds HTTP 503 retains status and path without exposing the diagnostic base or query', async () => {
  for (const [method, args, pathname] of [
    ['getFundList', [2, { query: 'private-filter' }], '/api/funds/list'],
    ['getFundSectors', [{ query: 'private-filter' }], '/api/funds/sectors'],
    ['getFundRoundStages', [{ query: 'private-filter' }], '/api/funds/rounds'],
  ]) {
    const api = loadAPI(() => Response.json({ message: 'private-body' }, { status: 503 }));
    await assert.rejects(api[method](...args), (error) => {
      assert.ok(error instanceof api.ResponseError);
      assert.equal(error.res.status, 503);
      assert.equal(error.message, `${method} (503 ${pathname}): Non 200 Response`);
      assert.doesNotMatch(require('node:util').inspect(error), /private-|diagnostic\.invalid/);
      return true;
    });
    assert.ok(api.requests[0].input.startsWith(`${pathname}?`));
    assert.ok(api.requests[0].input.includes('query=private-filter'));
  }
});
