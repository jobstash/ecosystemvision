import { MW_URL, PAGE_SIZE } from '@/shared/core/envs';
import { createUrlWithSearchParams } from '@/shared/utils/create-url-with-search-params';
import { mwGET } from '@/shared/utils/mw-get';

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
    `${MW_URL}/grantees/list?page=${page}&limit=${PAGE_SIZE}&grantId=${grantId}`,
    searchParams,
  );

  return mwGET({
    url,
    label: 'getGrantList',
    responseSchema: granteeListQueryPageSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};
