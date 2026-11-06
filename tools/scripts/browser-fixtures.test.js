const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const ts = require('typescript');
const fixtures = require('./fixtures/browser-api');

// Parse the actual application contracts, without Next, Sentry, or network access.
const modules = new Map();
const load = (filename) => {
  if (modules.has(filename)) return modules.get(filename).exports;
  const module = { exports: {} };
  modules.set(filename, module);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const resolve = (name) => name.startsWith('@/')
    ? load(path.resolve(__dirname, '../../src', `${name.slice(2)}.ts`))
    : name.startsWith('.')
      ? load(path.resolve(path.dirname(filename), `${name}.ts`))
      : require(name);
  new Function('module', 'exports', 'require', source)(module, module.exports, resolve);
  return module.exports;
};
const schemas = (section) => load(path.resolve(__dirname, `../../src/${section}/core/schemas.ts`));

test('isolated browser fixtures match real organization, project, fund and filter contracts', () => {
  const orgs = schemas('orgs');
  orgs.orgDetailsSchema.parse(fixtures.organization);
  orgs.orgListItemSchema.parse(fixtures.orgListItem);
  schemas('shared').projectInfoSchema.parse(fixtures.project);
  const funds = schemas('funds');
  funds.fundDetailsSchema.parse(fixtures.fund);
  const search = schemas('search');
  search.pillarFiltersResponseDto.parse(fixtures.responseFor(new URL('http://local/search/pillar/filters')));
  search.pillarInfoResponseSchema.parse(fixtures.responseFor(new URL('http://local/search/pillar?nav=organizations')));
  search.searchResultsDtoSchema.parse(fixtures.responseFor(new URL('http://local/search')));
  assert.equal(new Date(fixtures.fund.activityToDate * 1000).getUTCFullYear(), 2026);
  assert.equal(fixtures.fund.soloRate, 100);
  assert.deepEqual(fixtures.responseFor(new URL('http://local/organizations/list?page=2')).data, []);
  assert.deepEqual(fixtures.responseFor(new URL('http://local/search/pillar/items?pillar=chains')).data, ['Fixture Chain']);
});

test('isolated browser API serves local data and fails closed for unimplemented routes', async (t) => {
  const server = fixtures.createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(`${origin}/organizations/details/slug/fixture-organization`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).name, 'Fixture Organization');
  assert.equal((await fetch(`${origin}/not-fixtured`)).status, 404);
  const missing = await fetch(`${origin}/search/pillar?item=fixture-missing`);
  assert.equal(missing.status, 200);
  assert.equal((await missing.json()).data, null);
  const unavailable = await fetch(`${origin}/search/pillar?item=fixture-unavailable`);
  assert.equal(unavailable.status, 503);
  assert.equal((await unavailable.json()).data, null);
  assert.equal((await (await fetch(`${origin}/search/pillar?item=fixture-error`)).json()).success, false);
});
