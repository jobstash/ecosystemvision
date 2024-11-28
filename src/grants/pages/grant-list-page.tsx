import dynamic from 'next/dynamic';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { GRANTS_PORTAL_IDS } from '@/grants/core/constants';
import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGrantDetails } from '@/grants/data/get-grant-details';
import { getGrantList } from '@/grants/data/get-grant-list';
import { AiGrantProgramFinderPortal } from '@/grants/components/ai-grant-program-finder';
import { GrantList } from '@/grants/components/grant-list/grant-list';

const AiGrantProgramFinderSkeleton = dynamic(
  () =>
    import(
      '@/grants/components/ai-grant-program-finder/ai-grant-program-finder-skeleton'
    ).then((m) => m.AiGrantProgramFinderSkeleton),
  { ssr: true },
);

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
      .map(({ slug }) =>
        queryClient.prefetchQuery({
          queryKey: grantQueryKeys.grant(slug),
          queryFn: () => getGrantDetails(slug),
        }),
      ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-5 pt-[56px] md:pt-[80px] lg:pl-4 lg:pr-8">
        <h1 className="pt-6 text-2xl font-semibold tracking-[-0.06em] md:pt-2 md:text-4xl lg:pt-0 lg:text-7xl">
          Grant Programs
        </h1>
        <div id={GRANTS_PORTAL_IDS.AI_FINDER_MOBILE}>
          <div className="lg:hidden">
            <AiGrantProgramFinderSkeleton />
          </div>
        </div>
        <GrantList />
      </div>
      <AiGrantProgramFinderPortal />
    </HydrationBoundary>
  );
};
