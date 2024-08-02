import { useInView } from 'react-intersection-observer';

import { useGrantListQuery } from '@/grants/hooks/use-grant-list-query';

export const useGrantList = () => {
  const { data, error, fetchNextPage, hasNextPage, isPending, isFetching } =
    useGrantListQuery();

  // Next page fetch on scroll
  const { ref: inViewRef } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && !error && !isFetching) fetchNextPage();
    },
  });

  return {
    grants: data?.pages.flatMap((d) => d.data) ?? [],
    error,
    inViewRef,
    hasNextPage,
    isPending,
  };
};
