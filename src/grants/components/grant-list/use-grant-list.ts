import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGrantDetails } from '@/grants/data/get-grant-details';
import { useGrantListQuery } from '@/grants/hooks/use-grant-list-query';

export const useGrantList = () => {
  const queryClient = getQueryClient();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isSuccess,
  } = useGrantListQuery();

  // Next page fetch on scroll
  const { ref: inViewRef } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && !error && !isFetching) fetchNextPage();
    },
  });

  // Prefetch grant details
  useEffect(() => {
    if (isSuccess && data) {
      const items = data.pages.flatMap((d) => d.data);
      for (const item of items) {
        const { slug } = item;
        queryClient.prefetchQuery({
          queryKey: grantQueryKeys.grant(slug),
          queryFn: () => getGrantDetails(slug),
        });
      }
    }
  });

  return {
    grants: data?.pages.flatMap((d) => d.data) ?? [],
    error,
    inViewRef,
    hasNextPage,
    isPending,
  };
};
