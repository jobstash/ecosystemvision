import { expect, test } from '@playwright/test';

const removedIdentityPaths = [
  '/people/alice',
  '/people/nonexistent',
  '/organizations/info/acme/team',
  '/organizations/names/nonexistent/team',
];

test.describe('@desktop removed identity routes', () => {
  test('return one identity-independent no-store tombstone', async ({ request }) => {
    const responses = await Promise.all(
      removedIdentityPaths.map((path) => request.get(path)),
    );
    const bodies = await Promise.all(responses.map((response) => response.text()));

    expect(new Set(bodies)).toEqual(
      new Set(['This identity view has been removed.\n']),
    );
    for (const response of responses) {
      expect(response.status()).toBe(410);
      expect(response.headers()['cache-control']).toBe(
        'private, no-store, max-age=0, must-revalidate',
      );
      expect(response.headers()['x-robots-tag']).toBe(
        'noindex, nofollow, noarchive',
      );
    }
  });
});
