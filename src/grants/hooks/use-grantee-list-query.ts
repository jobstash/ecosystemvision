import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { GrantQueryKeys, grantQueryKeys } from '@/grants/core/query-keys';
import { GranteeListQueryPage } from '@/grants/core/schemas';
import { getGranteesList } from '@/grants/data/get-grantees-list';

export const useGranteeListQuery = (grantId: string) => {
  // TODO: filter search params string
  const searchParams = '';

  return useInfiniteQuery<
    GranteeListQueryPage,
    Error,
    InfiniteData<GranteeListQueryPage, number>,
    ReturnType<GrantQueryKeys['grantees']>,
    number
  >({
    queryKey: grantQueryKeys.grantees(grantId, searchParams),
    queryFn: async ({ pageParam }) =>
      getGranteesList({ page: pageParam, grantId, searchParams }),
    initialPageParam: 1,
    getNextPageParam: ({ page, data }) =>
      typeof page === 'number' && page > 0 && data.length > 0
        ? page + 1
        : undefined,
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
