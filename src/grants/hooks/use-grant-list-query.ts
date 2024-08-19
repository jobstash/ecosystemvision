import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { GrantQueryKeys, grantQueryKeys } from '@/grants/core/query-keys';
import { GrantInfiniteListPage } from '@/grants/core/schemas';
import { getGrantList } from '@/grants/data/get-grant-list';

export const useGrantListQuery = () => {
  // TODO: filter search params string
  const searchParams = '';

  return useInfiniteQuery<
    GrantInfiniteListPage,
    Error,
    InfiniteData<GrantInfiniteListPage, number>,
    ReturnType<GrantQueryKeys['list']>,
    number
  >({
    queryKey: grantQueryKeys.list(searchParams),
    queryFn: async ({ pageParam: page }) =>
      getGrantList({ page, searchParams }),
    initialPageParam: 1,
    getNextPageParam: ({ page, data }) =>
      typeof page === 'number' && page > 0 && data.length > 0
        ? page + 1
        : undefined,
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
