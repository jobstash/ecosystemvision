import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { orgQueryKeys } from '@/orgs/core/query-keys';
import { getOrgDetails } from '@/orgs/data/get-org-details';
import { getOrgList } from '@/orgs/data/get-org-list';

import { OrgListClientPage } from './client-page';

// Force SSR on this page (needed to pick up searchParams)
export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Record<string, string>;
}

const OrgListPage = async ({ searchParams: rawSearchParams }: Props) => {
  const queryClient = getQueryClient();

  const [orgListResult] = await Promise.all([
    // Prefetch list
    queryClient.fetchInfiniteQuery({
      queryKey: orgQueryKeys.list(rawSearchParams),
      queryFn: async ({ pageParam }) => getOrgList(pageParam, rawSearchParams),
      initialPageParam: 1,
    }),
  ]);

  // Prefetch details for each org item
  await Promise.all(
    orgListResult.pages
      .flatMap((page) => page.data)
      .map(({ normalizedName: slug }) =>
        queryClient.prefetchQuery({
          queryKey: orgQueryKeys.details(slug),
          queryFn: () => getOrgDetails(slug),
        }),
      ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrgListClientPage />
    </HydrationBoundary>
  );
};

export default OrgListPage;
