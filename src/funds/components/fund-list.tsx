'use client';

import { useInView } from 'react-intersection-observer';

import { Spinner } from '@heroui/spinner';
import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';
import { PAGE_SIZE } from '@/shared/core/envs';
import { cn } from '@/shared/utils/cn';
import { InternalErrorResult } from '@/shared/components/internal-error-result';
import { Loader } from '@/shared/components/loader';
import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

import { fundQueryKeys } from '@/funds/core/query-keys';
import { getFundList } from '@/funds/data/get-fund-list';
import { FundCard } from '@/funds/components/fund-card';

interface Props {
  searchParams: Record<string, string>;
}

export const FundList = ({ searchParams }: Props) => {
  const query = useInfiniteQuery({
    queryKey: fundQueryKeys.list(searchParams),
    queryFn: ({ pageParam }) => getFundList(pageParam, searchParams),
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
  if (query.error) {
    return <InternalErrorResult onReset={() => void query.refetch()} />;
  }

  return (
    <div>
      {funds.length > 0 ? (
        <VirtualWrapper count={funds.length} className="m-4 lg:m-8">
          {(index) => (
            <div className={cn({ 'pt-8': index > 0 })}>
              <FundCard fund={funds[index]} />
            </div>
          )}
        </VirtualWrapper>
      ) : (
        <p className="p-4 lg:p-8">No funds match these filters.</p>
      )}
      {query.hasNextPage && (
        <div ref={ref} className="m-4 flex justify-center py-4 lg:m-8">
          <Loader />
        </div>
      )}
    </div>
  );
};
