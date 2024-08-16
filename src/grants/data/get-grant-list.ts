import { PAGE_SIZE } from '@/shared/core/envs';
import { createUrlWithSearchParams } from '@/shared/utils/create-url-with-search-params';
import { mwGET } from '@/shared/utils/mw-get';

import { GRANT_QUERY_URLS } from '@/grants/core/constants';
import {
  grantDtoInfiniteListPageSchema,
  GrantInfiniteListPage,
} from '@/grants/core/schemas';
import { dtoToGrant } from '@/grants/utils/dto-to-grant';

export const getGrantList = async (
  page: number,
  searchParams = '',
): Promise<GrantInfiniteListPage> => {
  const url = createUrlWithSearchParams(
    `${GRANT_QUERY_URLS.GRANT_LIST}?page=${page}&limit=${PAGE_SIZE}`,
    searchParams,
  );

  const response = await mwGET({
    url,
    label: 'getGrantList',
    responseSchema: grantDtoInfiniteListPageSchema,
    options: { next: { revalidate: 60 * 60 } },
  });

  return { ...response, data: response.data.map(dtoToGrant) };
};
