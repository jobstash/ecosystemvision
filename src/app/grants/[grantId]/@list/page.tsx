import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGranteeDetails } from '@/grants/data/get-grantee-details';
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

  // Prefetch details for each grantee item
  await Promise.all(
    granteeListResult.pages
      .flatMap((page) => page.data)
      .map(({ id }) =>
        queryClient.prefetchQuery({
          queryKey: grantQueryKeys.grantee(id),
          queryFn: () => getGranteeDetails(id),
        }),
      ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GranteeList />
    </HydrationBoundary>
  );
};

export default ParallelGranteeList;
