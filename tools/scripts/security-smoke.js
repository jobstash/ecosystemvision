// Run after a fixture-configured build: no production API or telemetry traffic.
const assert = require('node:assert/strict');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { chromium } = require('@playwright/test');
const { createServer } = require('./fixtures/browser-api');
const origin = 'http://127.0.0.1:4331';
const guard = path.resolve(__dirname, 'fixtures/network-guard.cjs');
const run = async () => {
  const fixture = createServer();
  await new Promise((resolve) => fixture.listen(4321, '127.0.0.1', resolve));
  const app = spawn(process.execPath, ['--require', guard, require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', '4331'], {
    env: { ...process.env, NODE_ENV: 'production', FIXTURE_ALLOW_FONTS: '0', NEXT_TELEMETRY_DISABLED: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let logs = '';
  app.stdout.on('data', (data) => { logs += data; });
  app.stderr.on('data', (data) => { logs += data; });
  let browser;
  try {
    for (let attempt = 0; ; attempt += 1) {
      try { if ((await fetch(`${origin}/health/live`)).ok) break; } catch {}
      if (attempt >= 60 || app.exitCode !== null) throw new Error(`Fixture app failed to start: ${logs}`);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    for (const [route, status] of [
      ['/organizations/info/fixture-script', 200],
      ['/organizations/info/fixture-script/jobs', 200],
      ['/organizations/tags/fixture-missing', 404],
      ['/projects/tags/fixture-missing', 404],
      ['/organizations/tags/fixture-error', 500],
      ['/projects/tags/fixture-malformed', 500],
      ['/organizations/tags/fixture-unavailable', 500],
    ]) {
      const response = await fetch(origin + route, { headers: { 'User-Agent': 'Twitterbot' } });
      assert.equal(response.status, status, route);
      await response.text();
    }
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ serviceWorkers: 'block' });
    let blocked = 0;
    await context.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (url.origin === origin && url.pathname !== '/sentry-tunnel') return route.continue();
      blocked += 1;
      return route.abort('blockedbyclient');
    });
    // Demonstrate that the pre-fix serializer is exploitable in a real browser.
    const unsafe = await context.newPage();
    await unsafe.setContent('<script type="application/ld+json">' +
      JSON.stringify({ name: '</script><script>globalThis.__jsonLdInjected = true</script>' }) +
      '</script>');
    assert.equal(await unsafe.evaluate(() => globalThis.__jsonLdInjected), true);
    await unsafe.close();
    const page = await context.newPage();
    await page.goto(`${origin}/organizations/info/fixture-script`, { waitUntil: 'networkidle' });
    assert.equal(await page.evaluate(() => globalThis.__jsonLdInjected), undefined);
    assert.equal(await page.locator('script[type="application/ld+json"]').count(), 1);
    const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
    assert.match(jsonLd.name, /<\/ScRiPt>/);
    assert.ok(jsonLd.sameAs.some((value) => value.includes('</script>')));
    await page.goto(`${origin}/organizations/info/fixture-script/jobs`, { waitUntil: 'networkidle' });
    assert.equal(await page.evaluate(() => globalThis.__jsonLdInjected), undefined);
    assert.ok((await page.locator('body').innerText()).includes('Example Engineer'));
    await page.goto(`${origin}/organizations/tags/fixture-missing`, { waitUntil: 'networkidle' });
    assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
    console.log(JSON.stringify({ ssrRoutes: 7, browserJsonLd: 'escaped and inert', nullableJob: 'visible', missingPillar: 'noindex', blockedExternalRequests: blocked }));
  } finally {
    await browser?.close();
    app.kill('SIGTERM');
    await new Promise((resolve) => { if (app.exitCode !== null) resolve(); else app.once('exit', resolve); });
    await new Promise((resolve) => fixture.close(resolve));
  }
};
run().catch((error) => { console.error(error); process.exitCode = 1; });
