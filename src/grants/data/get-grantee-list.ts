import { PAGE_SIZE } from '@/shared/core/envs';
import { createUrlWithSearchParams } from '@/shared/utils/create-url-with-search-params';
import { mwGET } from '@/shared/utils/mw-get';

import { grantQueryUrls } from '@/grants/core/query-urls';
import { granteeListQueryPageSchema } from '@/grants/core/schemas';

interface Props {
  page: number;
  searchParams?: string;
  grantId: string;
}

export const getGranteeList = async ({
  page,
  grantId,
  searchParams = '',
}: Props) => {
  const url = createUrlWithSearchParams(
    `${grantQueryUrls.GRANTEE_LIST}?page=${page}&limit=${PAGE_SIZE}&grantId=${grantId}`,
    searchParams,
  );

  return mwGET({
    url,
    label: 'getGranteeList',
    responseSchema: granteeListQueryPageSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};
