import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGranteeDetails } from '@/grants/data/get-grantee-details';
import { getGranteeList } from '@/grants/data/get-grantee-list';
import { GranteeList } from '@/grants/components/grantee-list';

interface Props {
  params: { grantId: string };
}

const ParallelGranteeList = async ({ params: { grantId } }: Props) => {
  await new Promise((r) => setTimeout(r, 10000));

  const queryClient = getQueryClient();

  const [granteeListResult] = await Promise.all([
    // Prefetch list
    queryClient.fetchInfiniteQuery({
      queryKey: grantQueryKeys.grantees(grantId, ''),
      queryFn: async ({ pageParam: page }) => getGranteeList({ page, grantId }),
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

    await Promise.all(promises);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GranteeList />
    </HydrationBoundary>
  );
};

export default ParallelGranteeList;
