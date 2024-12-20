import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { OrgQueryKeys, orgQueryKeys } from '@/orgs/core/query-keys';
import { OrgInfiniteListPage } from '@/orgs/core/schemas';
import { getOrgList } from '@/orgs/data/get-org-list';

interface Props {
  searchParams: string | Record<string, string>;
}

export const useOrgListQuery = ({ searchParams }: Props) => {
  return useInfiniteQuery<
    OrgInfiniteListPage,
    Error,
    InfiniteData<OrgInfiniteListPage, number>,
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
