import { PAGE_SIZE } from '@/shared/core/envs';
import { createUrlWithSearchParams } from '@/shared/utils/create-url-with-search-params';
import { mwGET } from '@/shared/utils/mw-get';

import { GRANT_QUERY_URLS } from '@/grants/core/constants';
import { granteeListQueryPageSchema } from '@/grants/core/schemas';

interface Props {
  page: number;
  searchParams?: string;
  grantId: string;
}

export const getGranteesList = async ({
  page,
  grantId,
  searchParams = '',
}: Props) => {
  const url = createUrlWithSearchParams(
    `${GRANT_QUERY_URLS.GRANTEE_LIST}?page=${page}&limit=${PAGE_SIZE}&grantId=${grantId}`,
    searchParams,
  );

  return mwGET({
    url,
    label: 'getGrantList',
    responseSchema: granteeListQueryPageSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};
