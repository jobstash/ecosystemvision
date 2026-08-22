/* eslint-disable @typescript-eslint/no-var-requires */

const assert = require('node:assert/strict');
const test = require('node:test');

const {
  pathnameFromEntry,
  sanitizeSitemapEntries,
} = require('./generate-sitemap');

const sitemap = (paths) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((path) => `  <url><loc>https://ecosystem.vision${path}</loc></url>`)
  .join('\n')}
</urlset>`;

test('removes individual identities and team rosters from every sitemap size', () => {
  const entries = sanitizeSitemapEntries(
    sitemap([
      '/',
      '/people/alice',
      '/people/nonexistent',
      '/organizations/info/acme/team',
      '/organizations/names/missing/team',
      '/organizations/info/acme/jobs',
    ]),
  );

  assert.deepEqual(entries.map(pathnameFromEntry), [
    '/',
    '/organizations/info/acme/jobs',
    '/people',
  ]);
});

test('keeps a single aggregate people route', () => {
  const entries = sanitizeSitemapEntries(sitemap(['/people', '/people/alice']));

  assert.deepEqual(entries.map(pathnameFromEntry), ['/people']);
});
