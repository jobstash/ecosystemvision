import { PAGE_SIZE } from '@/shared/core/envs';
import { createUrlWithSearchParams } from '@/shared/utils/create-url-with-search-params';
import { mwGET } from '@/shared/utils/mw-get';

import { grantQueryUrls } from '@/grants/core/query-urls';
import {
  grantDtoInfiniteListPageSchema,
  GrantInfiniteListPage,
} from '@/grants/core/schemas';
import { dtoToGrant } from '@/grants/utils/dto-to-grant';

interface Props {
  page: number;
  searchParams?: string | Record<string, string>;
  limit?: number;
}

export const getGrantList = async ({
  page,
  searchParams = '',
  limit = Number(PAGE_SIZE) || 20,
}: Props): Promise<GrantInfiniteListPage> => {
  const url = createUrlWithSearchParams(
    `${grantQueryUrls.base}?page=${page}&limit=${limit}`,
    searchParams,
  );

  const response = await mwGET({
    url,
    label: 'getGrantList',
    responseSchema: grantDtoInfiniteListPageSchema,
    options: {
      next: {
        revalidate: 43200, // 12 hours
        tags: ['grants'],
      },
    },
  });

  return { ...response, data: response.data.map(dtoToGrant) };
};
