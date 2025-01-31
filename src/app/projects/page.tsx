import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { projectQueryKeys } from '@/projects/core/query-keys';
import { getProjectList } from '@/projects/data/get-project-list';
import { ProjectListClient } from '@/projects/components/project-list/project-list-client';

import { PillarPage } from '@/search/pages/pillar-page';

interface Props {
  searchParams: Promise<Record<string, string>>;
}

const ProjectListPage = async ({ searchParams }: Props) => {
  const rawSearchParams = await searchParams;
  const queryClient = getQueryClient();

  // const [projectListResult] = await Promise.all([
  //   // Prefetch list
  //   queryClient.fetchInfiniteQuery({
  //     queryKey: projectQueryKeys.list(rawSearchParams),
  //     queryFn: async ({ pageParam }) =>
  //       getProjectList({ page: pageParam, searchParams: rawSearchParams }),
  //     initialPageParam: 1,
  //   }),
  // ]);

  // // Prefetch details for each org item
  // await Promise.all(
  //   projectListResult.pages
  //     .flatMap((page) => page.data)
  //     .map(({ normalizedName: slug }) =>
  //       queryClient.prefetchQuery({
  //         queryKey: projectQueryKeys.details(slug),
  //         queryFn: () => getProjectDetails(slug),
  //       }),
  //     ),
  // );

  await queryClient.fetchInfiniteQuery({
    queryKey: projectQueryKeys.list(rawSearchParams),
    queryFn: async ({ pageParam }) =>
      getProjectList({ page: pageParam, searchParams: rawSearchParams }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PillarPage
        isIndex
        nav="projects"
        params={{ pillar: '', item: '' }}
        searchParams={rawSearchParams}
        content={<ProjectListClient searchParams={rawSearchParams} />}
      />
    </HydrationBoundary>
  );
};

export default ProjectListPage;
