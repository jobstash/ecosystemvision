import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { projectQueryKeys } from '@/projects/core/query-keys';
import { getProjectDetails } from '@/projects/data/get-project-details';
import { getProjectList } from '@/projects/data/get-project-list';

import { ProjectListClientPage } from './client-page';

interface Props {
  searchParams: Record<string, string>;
}

const ProjectListPage = async ({ searchParams: rawSearchParams }: Props) => {
  const queryClient = getQueryClient();

  const [projectListResult] = await Promise.all([
    // Prefetch list
    queryClient.fetchInfiniteQuery({
      queryKey: projectQueryKeys.list(rawSearchParams),
      queryFn: async ({ pageParam }) =>
        getProjectList({ page: pageParam, searchParams: rawSearchParams }),
      initialPageParam: 1,
    }),
  ]);

  // Prefetch details for each org item
  await Promise.all(
    projectListResult.pages
      .flatMap((page) => page.data)
      .map(({ normalizedName: slug }) =>
        queryClient.prefetchQuery({
          queryKey: projectQueryKeys.details(slug),
          queryFn: () => getProjectDetails(slug),
        }),
      ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectListClientPage />
    </HydrationBoundary>
  );
};

export default ProjectListPage;
