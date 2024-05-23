import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { OrgQueryKeys, orgQueryKeys } from '@/orgs/core/query-keys';
import { OrgListQueryPage } from '@/orgs/core/schemas';
import { getOrgList } from '@/orgs/data/get-org-list';
import { useFiltersContext } from '@/filters/providers/filters-provider/context';

export const useOrgListQuery = () => {
  const { filterParamsString } = useFiltersContext();

  const searchParams = filterParamsString.startsWith('?')
    ? filterParamsString.slice(1)
    : filterParamsString;

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
