import { useInView } from 'react-intersection-observer';

import { useGranteeListQuery } from '@/grants/hooks/use-grantee-list-query';

export const useGranteeList = (grantId: string) => {
  const { data, error, fetchNextPage, hasNextPage, isPending, isFetching } =
    useGranteeListQuery(grantId);

  // Next page fetch on scroll
  const { ref: inViewRef } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && !error && !isFetching) fetchNextPage();
    },
  });

  return {
    grantees: data?.pages.flatMap((d) => d.data) ?? [],
    error,
    inViewRef,
    hasNextPage,
    isPending,
  };
};
