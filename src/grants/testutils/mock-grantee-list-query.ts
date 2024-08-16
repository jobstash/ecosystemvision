import { MockInfiniteQueryResult, MswOptions } from '@/shared/testutils/misc';
import { mockInfiniteListQuery } from '@/shared/testutils/mock-infinite-list-query';

import { grantQueryUrls } from '@/grants/core/query-urls';
import { GranteeItem } from '@/grants/core/schemas';

import { fakeGranteeItem } from './fake-grantee';

export const mockGranteeListQuery = (
  result: MockInfiniteQueryResult,
  options: MswOptions & { grantId: string; data?: GranteeItem[] },
) => {
  return mockInfiniteListQuery(
    {
      url: grantQueryUrls.grantees(options.grantId),
      data: Array.from({ length: 10 }).map(() => fakeGranteeItem()),
      overrideFirstPageData: options?.data,
    },
    result,
    options,
  );
};
