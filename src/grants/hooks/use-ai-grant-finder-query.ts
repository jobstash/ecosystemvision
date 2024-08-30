import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { GrantQueryKeys, grantQueryKeys } from '@/grants/core/query-keys';
import { GrantInfiniteListPage } from '@/grants/core/schemas';
import { findGrantProgram } from '@/grants/data/find-grant-program';

export const useAiGrantFinderQuery = (query: string) => {
  return useInfiniteQuery<
    GrantInfiniteListPage,
    Error,
    InfiniteData<GrantInfiniteListPage, number>,
    ReturnType<GrantQueryKeys['aiGrantFinder']>,
    number
  >({
    enabled: !!query,
    queryKey: grantQueryKeys.aiGrantFinder(query),
    queryFn: async ({ pageParam: page }) => findGrantProgram({ page, query }),
    initialPageParam: 1,
    getNextPageParam: ({ page, data }) =>
      typeof page === 'number' && page > 0 && data.length > 10
        ? page + 1
        : undefined,
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
