import { MockInfiniteQueryResult, MswOptions } from '@/shared/testutils/misc';
import { mockInfiniteListQuery } from '@/shared/testutils/mockIfniniteListQuery';

import { GRANT_QUERY_URLS } from '@/grants/core/constants';

import { fakeGrantee } from './fake-grantee';

export const mockGranteeListQuery = (
  result: MockInfiniteQueryResult,
  options?: MswOptions,
) =>
  mockInfiniteListQuery(
    {
      url: GRANT_QUERY_URLS.GRANTEE_LIST,
      data: Array.from({ length: 10 }).map(() => fakeGrantee),
    },
    result,
    options,
  );
