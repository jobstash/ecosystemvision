'use client';

import { useMemo } from 'react';

import { Spinner } from '@nextui-org/react';

import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

import { GrantListItem } from './grant-list-item';
import { useGrantList } from './use-grant-list';

export const GrantList = () => {
  // TODO: JOB-682

  const { grants, error, inViewRef, hasNextPage, isPending } = useGrantList();

  const lastItem = useMemo(() => {
    if (error) return <p>Error: {error.message}</p>;

    if (!hasNextPage) return <p>No more grants available.</p>;

    return (
      <div ref={inViewRef} className="flex w-full justify-center">
        <Spinner color="white" />
      </div>
    );
  }, [error, hasNextPage, inViewRef]);

  if (isPending) return <p>Loading Grants ...</p>;

  if (!grants.length) {
    return error ? <p>Error: {error.message}</p> : <p>No grants found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <VirtualWrapper count={grants.length}>
        {(index) => (
          <div className="pt-6 lg:pt-8">
            <GrantListItem grant={grants[index]} />
          </div>
        )}
      </VirtualWrapper>

      {lastItem}
    </div>
  );
};
