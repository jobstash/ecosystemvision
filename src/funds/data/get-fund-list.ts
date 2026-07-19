import { MW_URL, PAGE_SIZE } from '@/shared/core/envs';
import { createUrlWithSearchParams } from '@/shared/utils/create-url-with-search-params';
import { mwGET } from '@/shared/utils/mw-get';

import { fundListPageSchema } from '@/funds/core/schemas';

export const getFundList = (
  page: number,
  searchParams: Record<string, string>,
) =>
  mwGET({
    url: createUrlWithSearchParams(
      `${MW_URL}/funds/list?page=${page}&limit=${PAGE_SIZE}`,
      searchParams,
    ),
    label: 'getFundList',
    responseSchema: fundListPageSchema,
  });
