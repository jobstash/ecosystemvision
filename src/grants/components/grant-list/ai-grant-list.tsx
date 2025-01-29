import { useMemo } from 'react';

import { Spinner } from '@heroui/spinner';

import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

import { GrantListItem } from '@/grants/components/grant-list/grant-list-item';
import { useAiGrantList } from '@/grants/components/grant-list/use-ai-grant-list';

export const AiGrantList = () => {
  const { grants, error, inViewRef, hasNextPage, isPending } = useAiGrantList();

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
            <GrantListItem isAiResult grant={grants[index]} />
          </div>
        )}
      </VirtualWrapper>

      {lastItem}
    </div>
  );
};
