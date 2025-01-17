import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { orgQueryKeys } from '@/orgs/core/query-keys';
import { getOrgList } from '@/orgs/data/get-org-list';
import { OrgListClient } from '@/orgs/components/org-list/org-list-client';

import { PillarPage } from '@/search/pages/pillar-page';

// Force SSR on this page (needed to pick up searchParams)
export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<Record<string, string>>;
}

const OrgListPage = async ({ searchParams }: Props) => {
  const rawSearchParams = await searchParams;
  const queryClient = getQueryClient();

  // const [orgListResult] = await Promise.all([
  //   // Prefetch list
  //   queryClient.fetchInfiniteQuery({
  //     queryKey: orgQueryKeys.list(rawSearchParams),
  //     queryFn: async ({ pageParam }) => getOrgList(pageParam, rawSearchParams),
  //     initialPageParam: 1,
  //   }),
  // ]);

  // // Prefetch details for each org item
  // await Promise.all(
  //   orgListResult.pages
  //     .flatMap((page) => page.data)
  //     .map(({ normalizedName: slug }) =>
  //       queryClient.prefetchQuery({
  //         queryKey: orgQueryKeys.details(slug),
  //         queryFn: () => getOrgDetails(slug),
  //       }),
  //     ),
  // );

  await queryClient.prefetchInfiniteQuery({
    queryKey: orgQueryKeys.list(rawSearchParams),
    queryFn: async ({ pageParam }) => getOrgList(pageParam, rawSearchParams),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PillarPage
        isIndex
        nav="organizations"
        params={{ pillar: null, item: null }}
        searchParams={{}}
        content={<OrgListClient searchParams="" />}
      />
    </HydrationBoundary>
  );
};

export default OrgListPage;
