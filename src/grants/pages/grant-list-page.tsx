import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGrantDetails } from '@/grants/data/get-grant-details';
import { getGrantList } from '@/grants/data/get-grant-list';
import { GrantList } from '@/grants/components/grant-list/grant-list';

// TODO: Check if need to use search params(filter related), if so need to force dynamic

export const GrantListPage = async () => {
  const queryClient = getQueryClient();

  const [grantListResult] = await Promise.all([
    // Prefetch list
    queryClient.fetchInfiniteQuery({
      queryKey: grantQueryKeys.list(''),
      queryFn: async ({ pageParam: page }) => getGrantList({ page }),
      initialPageParam: 1,
    }),
  ]);

  // Prefetch details for each grant item
  await Promise.all(
    grantListResult.pages
      .flatMap((page) => page.data)
      .map(({ id }) =>
        queryClient.prefetchQuery({
          queryKey: grantQueryKeys.details(id),
          queryFn: () => getGrantDetails(id),
        }),
      ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-8">
        <GrantList />
      </div>
    </HydrationBoundary>
  );
};
