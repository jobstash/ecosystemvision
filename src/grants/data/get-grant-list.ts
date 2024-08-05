import { PAGE_SIZE } from '@/shared/core/envs';
import { createUrlWithSearchParams } from '@/shared/utils/create-url-with-search-params';
import { mwGET } from '@/shared/utils/mw-get';

import { GRANT_QUERY_URLS } from '@/grants/core/constants';
import { grantListQueryPageSchema } from '@/grants/core/schemas';

export const getGrantList = async (page: number, searchParams = '') => {
  const url = createUrlWithSearchParams(
    `${GRANT_QUERY_URLS.GRANT_LIST}?page=${page}&limit=${PAGE_SIZE}`,
    searchParams,
  );

  return mwGET({
    url,
    label: 'getGrantList',
    responseSchema: grantListQueryPageSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};
