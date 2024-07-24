import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { OrgQueryKeys, orgQueryKeys } from '@/orgs/core/query-keys';
import { OrgListQueryPage } from '@/orgs/core/schemas';
import { getOrgList } from '@/orgs/data/get-org-list';

export const useOrgListQuery = () => {
  // TODO: filter search params string
  const searchParams = '';

  return useInfiniteQuery<
    OrgListQueryPage,
    Error,
    InfiniteData<OrgListQueryPage, number>,
    ReturnType<OrgQueryKeys['list']>,
    number
  >({
    queryKey: orgQueryKeys.list(searchParams),
    queryFn: async ({ pageParam }) => getOrgList(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: ({ page, data }) =>
      page > 0 && data.length > 0 ? page + 1 : undefined,
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
