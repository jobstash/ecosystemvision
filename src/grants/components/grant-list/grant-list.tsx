'use client';

import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

import { GrantListItem } from './grant-list-item';
import { useGrantList } from './use-grant-list';

export const GrantList = () => {
  // TODO: JOB-682

  const { grants, error, inViewRef, hasNextPage, isPending } = useGrantList();

  if (isPending) return <p>Loading Grants ...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!grants.length) return <p>No grants found.</p>;

  const lastItem = hasNextPage ? (
    <div ref={inViewRef}>Loading more...</div>
  ) : (
    <p>No more grants available.</p>
  );

  return (
    <div className="flex flex-col gap-4">
      <VirtualWrapper count={grants.length}>
        {(index) => (
          <div className="pt-8">
            <GrantListItem grant={grants[index]} />
          </div>
        )}
      </VirtualWrapper>
      {lastItem}
    </div>
  );
};
