import { useMemo } from 'react';

import { Spinner } from '@heroui/spinner';

import { cn } from '@/shared/utils/cn';
import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

import { Grant } from '@/grants/core/schemas';
import { GrantListItem } from '@/grants/components/grant-list/grant-list-item';

interface Props {
  grants: Grant[];
  error: Error | null;
  inViewRef: (node?: Element | null) => void;
  hasNextPage: boolean;
  isPending: boolean;
  gaEvent: string;
  isLink?: boolean;
  isInfo?: boolean;
}

export const GrantListItems = (props: Props) => {
  const {
    grants,
    error,
    inViewRef,
    hasNextPage,
    isPending,
    gaEvent,
    isLink,
    isInfo,
  } = props;

  const lastItem = useMemo(() => {
    if (error) return <p>Error: {error.message}</p>;

    if (!hasNextPage) return <p>No more grants to display.</p>;

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
          <div className={cn({ 'pt-6 lg:pt-8': index > 0 })}>
            <GrantListItem
              grant={grants[index]}
              gaEvent={gaEvent}
              isLink={isLink}
              isInfo={isInfo}
            />
          </div>
        )}
      </VirtualWrapper>

      {lastItem}
    </div>
  );
};
