/* eslint-disable @typescript-eslint/no-var-requires */
// scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');

const SITEMAP_URL = 'https://middleware.jobstash.xyz/app/sitemap/ev';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const MAX_ATTEMPTS = 5;

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const minimalSitemap = () => {
  const updated = new Date().toISOString();
  const paths = [
    '',
    '/organizations',
    '/projects',
    '/funds',
  ];
  const entries = paths
    .map(
      (pathname) =>
        `  <url><loc>https://ecosystem.vision${pathname}</loc><lastmod>${updated}</lastmod></url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
};

const fetchSitemap = async () => {
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(SITEMAP_URL, {
        signal: AbortSignal.timeout(120_000),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) {
        const delay = 2_000 * attempt;
        console.warn(
          `Sitemap fetch attempt ${attempt}/${MAX_ATTEMPTS} failed; retrying in ${delay}ms`,
        );
        await wait(delay);
      }
    }
  }
  throw lastError;
};

/**
 * Fetches sitemap from middleware API and writes to public/sitemap.xml
 * Creates public directory if it doesn't exist
 * Only override the file if the contents have changed
 */
async function generateSitemap() {
  console.log(`Fetching sitemap from ${SITEMAP_URL}...`);

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  let newSitemap;
  try {
    newSitemap = await fetchSitemap();
  } catch (error) {
    if (fs.existsSync(SITEMAP_PATH) && fs.statSync(SITEMAP_PATH).size > 0) {
      console.warn(
        `Middleware sitemap remained unavailable; preserving ${SITEMAP_PATH}: ${error.message}`,
      );
      return;
    }
    console.warn(
      `Middleware sitemap remained unavailable; writing a minimal deployment-safe sitemap: ${error.message}`,
    );
    newSitemap = minimalSitemap();
  }

  let currentSitemap = null;
  if (fs.existsSync(SITEMAP_PATH)) {
    currentSitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  }

  if (currentSitemap !== newSitemap) {
    fs.writeFileSync(SITEMAP_PATH, newSitemap);
    console.log(`Sitemap updated at ${SITEMAP_PATH}`);
  } else {
    console.log('No changes in sitemap. File not updated.');
  }
}

generateSitemap().catch((err) => {
  console.error('Error generating sitemap:', err);
  process.exit(1);
});
