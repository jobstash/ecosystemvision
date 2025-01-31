import { Metadata } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { GRANTS_PORTAL_IDS } from '@/grants/core/constants';
import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGrantList } from '@/grants/data/get-grant-list';
import { AiGrantProgramFinderPortal } from '@/grants/components/ai-grant-program-finder';
import { AiGrantProgramFinderSkeleton } from '@/grants/components/ai-grant-program-finder/ai-grant-program-finder-skeleton';
import { ActiveGrantList } from '@/grants/components/grant-list';

import { PillarPage } from '@/search/pages/pillar-page';

export const metadata: Metadata = {
  title: 'Active Grant Programs - Ecosystem Vision',
  description:
    'Explore active grant programs driving the Web3 space forward. Discover funding opportunities and stay updated on real-time impacts with insights from our partnership with Ecosystem Vision, ThankArb, and the Cartographer Syndicate.',
};

interface Props {
  searchParams: Promise<Record<string, string>>;
}

const ActiveGrantsPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const queryClient = getQueryClient();

  queryClient.fetchInfiniteQuery({
    queryKey: grantQueryKeys.list({ status: 'active' }),
    queryFn: async ({ pageParam: page }) => getGrantList({ page }),
    initialPageParam: 1,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PillarPage
          isIndex
          nav="grants"
          params={{ pillar: '', item: '' }}
          searchParams={searchParams}
          content={
            <div id={GRANTS_PORTAL_IDS.AI_FINDER_MOBILE}>
              <div className="lg:hidden">
                <AiGrantProgramFinderSkeleton />
              </div>
              <ActiveGrantList />
              <AiGrantProgramFinderPortal />
            </div>
          }
        />
      </HydrationBoundary>
    </>
  );
};

export default ActiveGrantsPage;
