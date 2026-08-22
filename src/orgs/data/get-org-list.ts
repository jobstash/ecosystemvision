import { MW_URL, PAGE_SIZE } from '@/shared/core/envs';
import { createUrlWithSearchParams } from '@/shared/utils/create-url-with-search-params';
import { mwGET } from '@/shared/utils/mw-get';

import { suppressOrganizationIntelligence } from '@/orgs/core/public-aggregation';
import { orgInfiniteListPageSchema } from '@/orgs/core/schemas';

export const getOrgList = async (
  page: number,
  searchParams: string | Record<string, string>,
) => {
  const url = createUrlWithSearchParams(
    `${MW_URL}/organizations/list?page=${page}&limit=${PAGE_SIZE}`,
    searchParams,
  );

  const pageData = await mwGET({
    url,
    label: 'getOrgList',
    responseSchema: orgInfiniteListPageSchema,
  });
  return {
    ...pageData,
    data: pageData.data.map(suppressOrganizationIntelligence),
  };
};
