import { useMemo } from 'react';

import { Spinner } from '@nextui-org/react';

import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

import { Grant } from '@/grants/core/schemas';
import { GrantListItem } from '@/grants/components/grant-list/grant-list-item';

interface Props {
  grants: Grant[];
  error: Error | null;
  inViewRef: (node?: Element | null) => void;
  hasNextPage: boolean;
  isPending: boolean;
  isLink?: boolean;
  ctaText?: string;
}

export const GrantListItems = (props: Props) => {
  const { grants, error, inViewRef, hasNextPage, isPending, isLink, ctaText } =
    props;

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
          <div className="pt-6 lg:pt-8">
            <GrantListItem
              grant={grants[index]}
              isLink={isLink}
              ctaText={ctaText}
            />
          </div>
        )}
      </VirtualWrapper>

      {lastItem}
    </div>
  );
};
