import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { ProjectQueryKeys, projectQueryKeys } from '@/projects/core/query-keys';
import { ProjectInfiniteListPage } from '@/projects/core/schemas';
import { getProjectList } from '@/projects/data/get-project-list';
export const useProjectListQuery = () => {
  // TODO: filter search params string
  const searchParams = '';

  return useInfiniteQuery<
    ProjectInfiniteListPage,
    Error,
    InfiniteData<ProjectInfiniteListPage, number>,
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
