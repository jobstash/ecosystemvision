/* eslint-disable @typescript-eslint/no-var-requires */
const assert = require('node:assert/strict');
const test = require('node:test');
const { z } = require('zod/v3');

const implementations = [
  ['CommonJS', async () => z],
  ['ESM', async () => (await import('zod/v3')).z],
];

for (const [name, load] of implementations) {
  for (const kind of ['max', 'length', 'set']) {
    test(`${name}: bounded v3 ${kind} aborts before element parsing and refinement`, async () => {
      const runtime = await load();
      let elements = 0;
      let refinements = 0;
      const item = runtime.string().transform((value) => {
        elements++;
        return value.toUpperCase();
      });
      const collection = kind === 'set'
        ? runtime.set(item).max(2, 'collection limit')
        : kind === 'length'
          ? runtime.array(item).length(2, 'collection limit')
          : runtime.array(item).max(2, 'collection limit');
      const schema = collection.refine(() => {
        refinements++;
        return true;
      });
      const input = kind === 'set' ? new Set(['a', 'b', 'c']) : ['a', 'b', 'c'];
      for (const result of [schema.safeParse(input), await schema.safeParseAsync(input)]) {
        assert.equal(result.success, false);
        assert.equal(result.error.issues.length, 1);
        assert.equal(result.error.issues[0].code, 'too_big');
        assert.equal(result.error.issues[0].maximum, 2);
        assert.equal(result.error.issues[0].message, 'collection limit');
      }
      assert.equal(elements, 0);
      assert.equal(refinements, 0);
      assert.deepEqual(
        schema.parse(kind === 'set' ? new Set(['a', 'b']) : ['a', 'b']),
        kind === 'set' ? new Set(['A', 'B']) : ['A', 'B'],
      );
      assert.equal(elements, 2);
      assert.equal(refinements, 1);
    });
  }

  test(`${name}: retains v3 minimum-only, unbounded, and invalid-element behavior`, async () => {
    const runtime = await load();
    const input = ['a', 'b', 'c'];
    assert.deepEqual(runtime.array(runtime.string()).parse(input), input);
    assert.deepEqual(runtime.array(runtime.string()).min(2).parse(input), input);
    assert.deepEqual(runtime.set(runtime.string()).min(2).parse(new Set(input)), new Set(input));
    assert.equal(runtime.array(runtime.string()).max(2).safeParse([123]).success, false);
    assert.equal(runtime.array(runtime.string()).length(2).safeParse(['a']).success, false);
  });
}
