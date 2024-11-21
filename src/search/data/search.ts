import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  dtoToSearchResults,
  searchResultsDtoSchema,
} from '@/search/core/schemas';

export const search = async (query: string) => {
  const response = await mwGET({
    url: `${MW_URL}/search?query=${query}`,
    label: 'search',
    responseSchema: searchResultsDtoSchema,
  });

  return dtoToSearchResults(response);
};
