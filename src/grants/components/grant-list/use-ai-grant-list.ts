import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAtomValue } from 'jotai';

import { getQueryClient } from '@/shared/utils/get-query-client';

import { grantQueryKeys } from '@/grants/core/query-keys';
import { aiGrantFinderQueryAtom } from '@/grants/core/atoms';
import { getGrantDetails } from '@/grants/data/get-grant-details';
import { useAiGrantFinderQuery } from '@/grants/hooks/use-ai-grant-finder-query';

export const useAiGrantList = () => {
  const queryClient = getQueryClient();
  const aiQuery = useAtomValue(aiGrantFinderQueryAtom);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isSuccess,
  } = useAiGrantFinderQuery(aiQuery);

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
