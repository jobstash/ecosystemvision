import { MockInfiniteQueryResult, MswOptions } from '@/shared/testutils/misc';
import { mockInfiniteListQuery } from '@/shared/testutils/mock-infinite-list-query';

import { grantQueryUrls } from '@/grants/core/query-urls';

import { fakeGrant } from './fake-grant';

export const mockGrantListQuery = (
  result: MockInfiniteQueryResult,
  options?: MswOptions,
) =>
  mockInfiniteListQuery(
    {
      url: grantQueryUrls.base,
      data: Array.from({ length: 10 }).map(() => fakeGrant()),
    },
    result,
    options,
  );
