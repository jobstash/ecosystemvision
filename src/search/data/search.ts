import { fakeSearchResults } from '@/search/testutils/fake-search-results';

export const search = async (_query: string) => {
  await new Promise((r) => setTimeout(r, 200));
  return fakeSearchResults();
};
