import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGranteeDetails } from '@/grants/data/get-grantee-details';
import { getGranteeProject } from '@/grants/data/get-grantee-project';
import { getGranteesList } from '@/grants/data/get-grantees-list';
import { GranteeList } from '@/grants/components/grantee-list';

interface Props {
  params: { grantId: string };
}

const ParallelGranteeList = async ({ params: { grantId } }: Props) => {
  const queryClient = getQueryClient();

  const [granteeListResult] = await Promise.all([
    // Prefetch list
    queryClient.fetchInfiniteQuery({
      queryKey: grantQueryKeys.grantees(grantId, ''),
      queryFn: async ({ pageParam: page }) =>
        getGranteesList({ page, grantId }),
      initialPageParam: 1,
    }),
  ]);

  // Prefetch data for first item only (default for the page enough for seo)
  const grantee = granteeListResult.pages.flatMap((page) => page.data).at(0);
  if (grantee) {
    // Prefetch grantee details
    const promises = [
      queryClient.prefetchQuery({
        queryKey: grantQueryKeys.grantee(grantee.id),
        queryFn: () => getGranteeDetails(grantee.id),
      }),
    ];

    // Prefetch first project details
    if (grantee.projects.length > 0) {
      promises.push(
        queryClient.prefetchQuery({
          queryKey: grantQueryKeys.project(grantee.projects[0]),
          queryFn: () => getGranteeProject(grantee.projects[0]),
        }),
      );
    }

    await Promise.all(promises);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GranteeList />
    </HydrationBoundary>
  );
};

export default ParallelGranteeList;
