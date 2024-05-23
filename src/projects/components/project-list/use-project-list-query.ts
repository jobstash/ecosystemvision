import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { ProjectQueryKeys, projectQueryKeys } from '@/projects/core/query-keys';
import { ProjectListQueryPage } from '@/projects/core/schemas';
import { getProjectList } from '@/projects/data/get-project-list';
import { useFiltersContext } from '@/filters/providers/filters-provider/context';

export const useProjectListQuery = () => {
  const { filterParamsString } = useFiltersContext();

  const searchParams = filterParamsString.startsWith('?')
    ? filterParamsString.slice(1)
    : filterParamsString;

  return useInfiniteQuery<
    ProjectListQueryPage,
    Error,
    InfiniteData<ProjectListQueryPage, number>,
    ReturnType<ProjectQueryKeys['list']>,
    number
  >({
    queryKey: projectQueryKeys.list(searchParams),
    queryFn: async ({ pageParam }) =>
      getProjectList({ page: pageParam, searchParams }),
    initialPageParam: 1,
    getNextPageParam: ({ page, data }) =>
      page > 0 && data.length > 0 ? page + 1 : undefined,
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
