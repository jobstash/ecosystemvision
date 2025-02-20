import { Metadata } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGrantDetails } from '@/grants/data/get-grant-details';
import { getGrantList } from '@/grants/data/get-grant-list';
import { GrantList } from '@/grants/components/grant-list/apply-button';

export const metadata: Metadata = {
  title: 'Grant Programs - Ecosystem Vision',
  description:
    'Gain deep insights into the effectiveness of grant programs with our detailed metrics and analyses. Our collaboration with ThankArb, Ecosystem Vision, and the Cartographer Syndicate showcases how funding is driving real progress in the Web3 space.',
};

const GrantImpactPage = async () => {
  const queryClient = getQueryClient();

  const grantListResult = await queryClient.fetchInfiniteQuery({
    queryKey: grantQueryKeys.list(''),
    queryFn: async ({ pageParam: page }) => getGrantList({ page }),
    initialPageParam: 1,
  });

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
      <div className="px-5 pt-[56px] md:pt-[80px] lg:px-8">
        <h1 className="py-6 text-2xl font-semibold tracking-[-0.06em] md:pt-2 md:text-4xl lg:pt-0 lg:text-6xl">
          Grant Impact
        </h1>
        <GrantList />
      </div>
    </HydrationBoundary>
  );
};

export default GrantImpactPage;
