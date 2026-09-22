/* eslint-disable @typescript-eslint/no-var-requires */
const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Load the actual TypeScript schemas and display helpers in Node's test runner.
const load = (file) => {
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const loaded = { exports: {} };
  const localRequire = (id) =>
    id.startsWith('.')
      ? load(path.resolve(path.dirname(file), `${id}.ts`))
      : require(id);
  new Function('require', 'module', 'exports', source)(
    localRequire,
    loaded,
    loaded.exports,
  );
  return loaded.exports;
};
const root = path.resolve(__dirname, '../../src');
const { fundingRoundSchema } = load(`${root}/shared/core/schemas.ts`);
const { fundingDateLabel, fundingYearLabel, sortFundingRounds } = load(
  `${root}/shared/utils/funding-rounds.ts`,
);
const round = {
  id: 'f8e58513-6d55-4d2f-bf05-dac80e511e07',
  date: null,
  roundName: 'Seed',
  raisedAmount: null,
  sourceLink: null,
};

test('undated funding is accepted and displayed without an invented date', () => {
  assert.equal(fundingRoundSchema.parse(round).date, null);
  assert.equal(fundingDateLabel(null), 'Unknown');
  assert.equal(fundingYearLabel(null), 'Unknown date');
  assert.equal(
    fundingRoundSchema.safeParse({ ...round, date: 'unknown' }).success,
    false,
  );
});

test('known dates remain formatted and sort ahead of undated rounds without changing the input', () => {
  const input = [round, { ...round, id: 'dated', date: 1700000000 }];
  assert.equal(fundingDateLabel(1700000000), '14 Nov, 2023');
  assert.equal(fundingYearLabel(1700000000), '2023');
  assert.deepEqual(
    sortFundingRounds(input).map((r) => r.id),
    ['dated', round.id],
  );
  assert.equal(input[0], round);
  assert.equal(sortFundingRounds([round, { ...round }]).length, 2);
});
