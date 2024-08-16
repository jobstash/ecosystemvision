import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { GrantQueryKeys, grantQueryKeys } from '@/grants/core/query-keys';
import { GranteeInfiniteListPage } from '@/grants/core/schemas';
import { getGranteeList } from '@/grants/data/get-grantee-list';

export const useGranteeListQuery = (grantId?: string, enabled = true) => {
  // TODO: filter search params string
  const searchParams = '';

  return useInfiniteQuery<
    GranteeInfiniteListPage,
    Error,
    InfiniteData<GranteeInfiniteListPage, number>,
    ReturnType<GrantQueryKeys['grantees']>,
    number
  >({
    queryKey: grantQueryKeys.grantees(grantId!, searchParams),
    queryFn: async ({ pageParam }) =>
      getGranteeList({ page: pageParam, grantId: grantId!, searchParams }),
    initialPageParam: 1,
    getNextPageParam: ({ page, data }) =>
      typeof page === 'number' && page > 0 && data.length > 0
        ? page + 1
        : undefined,
    staleTime: QUERY_STALETIME.DEFAULT,
    enabled: !!grantId && enabled,
  });
};
