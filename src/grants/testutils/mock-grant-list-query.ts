import { MockInfiniteQueryResult, MswOptions } from '@/shared/testutils/misc';
import { mockInfiniteListQuery } from '@/shared/testutils/mock-infinite-list-query';

import { GRANT_QUERY_URLS } from '@/grants/core/constants';

import { fakeGrant } from './fake-grant';

export const mockGrantListQuery = (
  result: MockInfiniteQueryResult,
  options?: MswOptions,
) =>
  mockInfiniteListQuery(
    {
      url: GRANT_QUERY_URLS.BASE,
      data: Array.from({ length: 10 }).map(() => fakeGrant()),
    },
    result,
    options,
  );
