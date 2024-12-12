import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  dtoToSearchResults,
  searchResultsDtoSchema,
} from '@/search/core/schemas';

export const search = async (query: string) => {
  const url = new URL(`${MW_URL}/search`);
  if (query) url.searchParams.append('query', query);

  const response = await mwGET({
    url: url.toString(),
    label: 'search',
    responseSchema: searchResultsDtoSchema,
  });

  return dtoToSearchResults(response);
};
