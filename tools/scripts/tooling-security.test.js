const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const { createRequire, findPackageJSON } = require('node:module');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const test = require('node:test');

const typescriptEslintRequire = createRequire(require.resolve('typescript-eslint'));
const estreeRequire = createRequire(
  typescriptEslintRequire.resolve('@typescript-eslint/typescript-estree'),
);
const minimatchEntry = estreeRequire.resolve('minimatch');

test('typescript-estree matching retains dot-file and exclusion behavior', () => {
  const { minimatch } = require(minimatchEntry);
  for (const [filename, pattern, expected] of [
    ['fixture.ts', '*.ts', true],
    ['.fixture.ts', '*.ts', true],
    ['fixture.js', '*.ts', false],
    ['nested/fixture.ts', '*.ts', false],
    ['nested/fixture.ts', 'nested/*.ts', true],
  ]) {
    assert.equal(minimatch(filename, pattern, { dot: true }), expected);
  }
});

test('consumed minimatch bounds globparts amplification', () => {
  const script = `
    const { Minimatch } = require(${JSON.stringify(minimatchEntry)});
    const matcher = new Minimatch('a/**/../'.repeat(12) + 'target.ts', {
      optimizationLevel: 2,
      braceExpandMax: 64,
    });
    process.stdout.write(String(matcher.globParts.length));
  `;
  const count = Number(execFileSync(process.execPath, ['-e', script], {
    encoding: 'utf8',
    timeout: 5000,
  }));
  assert.ok(count > 0 && count <= 64, `unexpected expansion count: ${count}`);
});

test('Storybook docgen dependency transforms real React TypeScript through Vite', async () => {
  const nextRequire = createRequire(require.resolve('@storybook/nextjs-vite'));
  const reactViteEntry = nextRequire.resolve('@storybook/react-vite');
  const manifestPath = findPackageJSON(
    '@joshwooding/vite-plugin-react-docgen-typescript',
    pathToFileURL(reactViteEntry),
  );
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const entry = path.resolve(path.dirname(manifestPath), manifest.exports['.'].import);
  const { default: docgen } = await import(pathToFileURL(entry).href);
  const { createServer } = await import('vite');
  const root = fs.mkdtempSync(path.join(__dirname, '.docgen-regression-'));
  let server;
  try {
    fs.writeFileSync(path.join(root, 'tsconfig.json'), JSON.stringify({
      compilerOptions: { jsx: 'react-jsx', module: 'esnext', moduleResolution: 'bundler' },
      include: ['*.tsx'],
    }));
    fs.writeFileSync(path.join(root, 'fixture.tsx'), [
      "import type { FC } from 'react';",
      '/** Synthetic component for the real Storybook docgen runtime. */',
      'export const Fixture: FC<{ label?: string }> = ({ label = "Example" }) => <span>{label}</span>;',
    ].join('\n'));
    server = await createServer({
      root,
      configFile: false,
      plugins: [docgen({ savePropValueAsString: true })],
      server: { middlewareMode: true },
    });
    const transformed = await server.transformRequest('/fixture.tsx');
    assert.ok(transformed);
    assert.match(transformed.code, /__docgenInfo/);
    assert.match(transformed.code, /label/);
    assert.match(transformed.code, /Example/);
  } finally {
    await server?.close();
    fs.rmSync(root, { recursive: true, force: true });
  }
});
