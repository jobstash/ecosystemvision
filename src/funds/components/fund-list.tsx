'use client';

import { useInView } from 'react-intersection-observer';

import { Spinner } from '@heroui/spinner';
import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';
import { PAGE_SIZE } from '@/shared/core/envs';
import { reloadPage } from '@/shared/utils/reload-page';
import { InternalErrorResult } from '@/shared/components/internal-error-result';
import { Loader } from '@/shared/components/loader';

import { fundQueryKeys } from '@/funds/core/query-keys';
import { getFundList } from '@/funds/data/get-fund-list';
import { FundCard } from '@/funds/components/fund-card';

export const FundList = () => {
  const query = useInfiniteQuery({
    queryKey: fundQueryKeys.list(),
    queryFn: ({ pageParam }) => getFundList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (page) =>
      page.data.length > 0 && page.page * Number(PAGE_SIZE) < page.total
        ? page.page + 1
        : undefined,
    staleTime: QUERY_STALETIME.DEFAULT,
  });
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && query.hasNextPage && !query.isFetchingNextPage) {
        void query.fetchNextPage();
      }
    },
  });
  const funds = query.data?.pages.flatMap((page) => page.data) ?? [];

  if (query.isPending) {
    return (
      <div className="flex justify-center py-16">
        <Spinner color="white" />
      </div>
    );
  }
  if (query.error) return <InternalErrorResult onReset={reloadPage} />;

  return (
    <div className="space-y-6">
      {funds.map((fund) => (
        <FundCard key={fund.id} fund={fund} />
      ))}
      {query.hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          <Loader />
        </div>
      )}
    </div>
  );
};
