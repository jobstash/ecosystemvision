/* eslint-disable @typescript-eslint/no-var-requires */
// scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');

const SITEMAP_URL = 'https://middleware.jobstash.xyz/app/sitemap/ev';
const PUBLIC_DIR =
  process.env.SITEMAP_OUTPUT_DIR || path.join(process.cwd(), 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const MAX_ATTEMPTS = 5;
const MAX_URLS_PER_SITEMAP = 45_000;
const SITEMAP_CHUNK_PATTERN = /^sitemap-\d+\.xml$/;

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

const writeIfChanged = (filePath, contents) => {
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, 'utf-8')
    : null;

  if (current !== contents) {
    fs.writeFileSync(filePath, contents);
    console.log(`Sitemap updated at ${filePath}`);
  }
};

const removeStaleChunks = (activeChunkNames) => {
  for (const filename of fs.readdirSync(PUBLIC_DIR)) {
    if (
      SITEMAP_CHUNK_PATTERN.test(filename) &&
      !activeChunkNames.has(filename)
    ) {
      fs.unlinkSync(path.join(PUBLIC_DIR, filename));
    }
  }
};

const writeSitemap = (rawSitemap) => {
  const urlEntries = rawSitemap.match(/<url\b[\s\S]*?<\/url>/g) ?? [];

  if (urlEntries.length <= MAX_URLS_PER_SITEMAP) {
    removeStaleChunks(new Set());
    writeIfChanged(SITEMAP_PATH, rawSitemap);
    return;
  }

  const urlsetTag = rawSitemap.match(/<urlset\b[^>]*>/)?.[0];
  if (!urlsetTag) {
    throw new Error('Middleware sitemap is missing its urlset root element');
  }

  const chunkNames = new Set();
  for (
    let offset = 0, chunkNumber = 1;
    offset < urlEntries.length;
    offset += MAX_URLS_PER_SITEMAP, chunkNumber += 1
  ) {
    const filename = `sitemap-${chunkNumber}.xml`;
    const chunk = urlEntries.slice(offset, offset + MAX_URLS_PER_SITEMAP);
    const contents = `<?xml version="1.0" encoding="UTF-8"?>\n${urlsetTag}\n${chunk.join('\n')}\n</urlset>\n`;
    chunkNames.add(filename);
    writeIfChanged(path.join(PUBLIC_DIR, filename), contents);
  }

  removeStaleChunks(chunkNames);
  const updated = new Date().toISOString();
  const indexEntries = [...chunkNames]
    .map(
      (filename) =>
        `  <sitemap><loc>https://ecosystem.vision/${filename}</loc><lastmod>${updated}</lastmod></sitemap>`,
    )
    .join('\n');
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries}\n</sitemapindex>\n`;
  writeIfChanged(SITEMAP_PATH, sitemapIndex);
  console.log(
    `Split ${urlEntries.length} URLs across ${chunkNames.size} sitemap files.`,
  );
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

  writeSitemap(newSitemap);
}

generateSitemap().catch((err) => {
  console.error('Error generating sitemap:', err);
  process.exit(1);
});
