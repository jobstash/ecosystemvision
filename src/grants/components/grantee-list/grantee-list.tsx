'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { cn } from '@nextui-org/react';

import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

import { GranteeListItem } from './item';
import { useGranteeList } from './use-grantee-list';

export const GranteeList = () => {
  // TODO: JOB-681

  const params = useParams();

  const { grantees, error, inViewRef, hasNextPage, isPending } = useGranteeList(
    params.grantId as string,
  );

  const lastItem = useMemo(() => {
    if (error) return <p>Error: {error.message}</p>;

    if (!hasNextPage) return <p>No more grantees available.</p>;

    return <div ref={inViewRef}>Loading more...</div>;
  }, [error, hasNextPage, inViewRef]);

  if (isPending) return <p>Loading Grants ...</p>;

  if (!grantees.length) {
    return error ? <p>Error: {error.message}</p> : <p>No grantees found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <VirtualWrapper count={grantees.length}>
        {(index) => (
          <div className={cn({ 'pt-8': index > 0 })}>
            <GranteeListItem grantee={grantees[index]} />
          </div>
        )}
      </VirtualWrapper>

      {lastItem}
    </div>
  );
};
