import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  dtoToSearchResults,
  searchResultsDtoSchema,
} from '@/search/core/schemas';
import { PillarSearchNavFilter } from '@/search/core/types';

export const search = async (query: string, nav?: PillarSearchNavFilter) => {
  const url = new URL(`${MW_URL}/search`);
  if (query) url.searchParams.append('query', query);

  const response = await mwGET({
    url: url.toString(),
    label: 'search',
    responseSchema: searchResultsDtoSchema,
  });

  return dtoToSearchResults(response, nav);
};
