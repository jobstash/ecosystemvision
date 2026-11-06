const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

test('fixture preload blocks external sockets before connecting', () => {
  const result = spawnSync(process.execPath, ['--require', path.join(__dirname, 'fixtures/network-guard.cjs'), '-e', `
    const assert = require('node:assert/strict');
    const net = require('node:net');
    for (const host of ['198.51.100.1', 'example.invalid', 'fonts.googleapis.com']) {
      assert.throws(() => net.connect({ host, port: 443 }), { code: 'ERR_FIXTURE_NETWORK' });
    }
  `], { env: { ...process.env, FIXTURE_ALLOW_FONTS: '0' }, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
});
