import { PAGE_SIZE } from '@/shared/core/envs';
import { createUrlWithSearchParams } from '@/shared/utils/create-url-with-search-params';
import { mwGET } from '@/shared/utils/mw-get';

import { grantQueryUrls } from '@/grants/core/query-urls';
import {
  GranteeInfiniteListPage,
  granteeInfiniteListPageSchema,
} from '@/grants/core/schemas';

// import { fakeGrantees } from '@/grants/testutils/fake-grantee';

interface Props {
  page: number;
  searchParams?: string;
  grantId: string;
}

// const data = fakeGrantees();

export const getGranteeList = async ({
  page,
  grantId,
  searchParams = '',
}: Props): Promise<GranteeInfiniteListPage> => {
  // return {
  //   page: page + 1,
  //   data,
  // };

  const url = createUrlWithSearchParams(
    `${grantQueryUrls.grantees(grantId)}?page=${page}&limit=${PAGE_SIZE}&grantId=${grantId}`,
    searchParams,
  );

  return mwGET({
    url,
    label: 'getGranteeList',
    responseSchema: granteeInfiniteListPageSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};
