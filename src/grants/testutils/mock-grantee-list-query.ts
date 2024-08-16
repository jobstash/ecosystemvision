import { MockInfiniteQueryResult, MswOptions } from '@/shared/testutils/misc';
import { mockInfiniteListQuery } from '@/shared/testutils/mock-infinite-list-query';

import { grantQueryUrls } from '@/grants/core/query-urls';
import { Grantee } from '@/grants/core/schemas';

import { fakeGrantee } from './fake-grantee';

export const mockGranteeListQuery = (
  result: MockInfiniteQueryResult,
  options?: MswOptions & { data?: Grantee[] },
) => {
  return mockInfiniteListQuery(
    {
      url: grantQueryUrls.GRANTEE_LIST,
      data: Array.from({ length: 10 }).map(() => fakeGrantee()),
      overrideFirstPageData: options?.data,
    },
    result,
    options,
  );
};
