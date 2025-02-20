// import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

// import { getQueryClient } from '@/shared/utils/get-query-client';

// import { grantQueryKeys } from '@/grants/core/query-keys';
// import { getGranteeDetails } from '@/grants/data/get-grantee-details';
// import { getGranteeList } from '@/grants/data/get-grantee-list';

import dynamic from 'next/dynamic';

const GranteeList = dynamic(
  () =>
    import('@/grants/components/grantee-list/grantee-list').then(
      (m) => m.GranteeList,
    ),
  { ssr: true },
);

// interface Props {
//   params: Promise<{ grantId: string }>;
// }

const ParallelGranteeList = async () => {
  // const ParallelGranteeList = async ({ params }: Props) => {
  // const { grantId } = await params;
  // const queryClient = getQueryClient();

  // const granteeListResult = await queryClient.fetchInfiniteQuery({
  //   queryKey: grantQueryKeys.grantees(grantId, ''),
  //   queryFn: async ({ pageParam: page }) => getGranteeList({ page, grantId }),
  //   initialPageParam: 1,
  // });

  // // Prefetch data for first item only (default for the page enough for seo)
  // const grantee = granteeListResult.pages.flatMap((page) => page.data).at(0);

  // if (grantee) {
  //   await queryClient.prefetchQuery({
  //     queryKey: grantQueryKeys.grantee(grantId, grantee.slug),
  //     queryFn: () => getGranteeDetails(grantId, grantee.slug),
  //   });
  // }

  // return <p>{'<ParallelGranteeList />'}</p>;
  return <GranteeList />;
  // return (
  // <HydrationBoundary state={dehydrate(queryClient)}>
  // <GranteeList />
  // </HydrationBoundary>
  // );
};

export default ParallelGranteeList;
