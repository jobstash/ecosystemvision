import { PAGE_SIZE } from '@/shared/core/envs';
import { createUrlWithSearchParams } from '@/shared/utils/create-url-with-search-params';
import { mwGET } from '@/shared/utils/mw-get';

import { grantQueryUrls } from '@/grants/core/query-urls';
import {
  GranteeInfiniteListPage,
  granteeInfiniteListPageDto,
} from '@/grants/core/schemas';
import { dtoToGranteeItem } from '@/grants/utils/dto-to-grantee-item';

// import { fakeGrantees } from '@/grants/testutils/fake-grantee';

interface Props {
  page: number;
  searchParams?: string;
  grantId: string;
  limit?: number;
}

// const data = fakeGrantees();

export const getGranteeList = async ({
  page,
  grantId,
  searchParams = '',
  limit = Number(PAGE_SIZE) || 20,
}: Props): Promise<GranteeInfiniteListPage> => {
  // return {
  //   page: page + 1,
  //   data,
  // };

  const url = createUrlWithSearchParams(
    `${grantQueryUrls.grantees(grantId)}?page=${page}&limit=${limit}`,
    searchParams,
  );

  const response = await mwGET({
    url,
    label: 'getGranteeList',
    responseSchema: granteeInfiniteListPageDto,
  });

  return {
    ...response,
    data: response.data.map(dtoToGranteeItem),
  };
};
