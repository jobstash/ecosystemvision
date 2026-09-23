/* eslint-disable @typescript-eslint/no-var-requires */
const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const source = ts.transpileModule(
  fs.readFileSync(
    path.resolve(__dirname, '../../src/orgs/utils/organization-route.ts'),
    'utf8',
  ),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const loaded = { exports: {} };
new Function('module', 'exports', source)(loaded, loaded.exports);
const { organizationRouteKey, organizationDetailsPath } = loaded.exports;
test('same-name organizations have distinct links and use the existing ID lookup', () => {
  const first = organizationRouteKey({
    normalizedName: 'merlin',
    orgId: '123',
  });
  const second = organizationRouteKey({
    normalizedName: 'merlin',
    orgId: '456',
  });
  assert.notEqual(first, second);
  assert.equal(organizationDetailsPath(first), '/organizations/details/123');
  assert.equal(organizationDetailsPath(second), '/organizations/details/456');
});
test('existing name links and organizations without IDs remain supported', () => {
  assert.equal(
    organizationDetailsPath('01ai'),
    '/organizations/details/slug/01ai',
  );
  assert.equal(organizationRouteKey({ normalizedName: 'legacy' }), 'legacy');
  assert.equal(
    organizationDetailsPath('example/other'),
    '/organizations/details/slug/example%2Fother',
  );
});
