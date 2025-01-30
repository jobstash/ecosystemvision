import { MW_URL } from '@/shared/core/envs';
import { getMappedNavParam } from '@/shared/utils/get-mapped-nav-param';
import { mwGET } from '@/shared/utils/mw-get';

import {
  dtoToSearchResults,
  searchResultsDtoSchema,
} from '@/search/core/schemas';

interface Options {
  query: string;
  nav?: string;
  excluded?: string;
}

export const search = async ({ query, nav, excluded }: Options) => {
  const url = new URL(`${MW_URL}/search`);
  if (query) url.searchParams.append('query', query);
  if (nav) url.searchParams.append('nav', getMappedNavParam(nav));
  if (excluded) url.searchParams.append('excluded', excluded);

  const response = await mwGET({
    url: url.toString(),
    label: 'search',
    responseSchema: searchResultsDtoSchema,
  });

  return dtoToSearchResults(response);
};
