'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Skeleton } from '@heroui/skeleton';
import { Spinner } from '@heroui/spinner';

import { cn } from '@/shared/utils/cn';
import { DraggableWrapper } from '@/shared/components/draggable-wrapper';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { PillarSearchInputItem } from './pillar-search-input-item';
import { LabeledItem } from './types';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  labeledItems: LabeledItem[];
}

export const PillarSearch = ({ labeledItems }: Props) => {
  const { isPendingPillarRoute: isLoading, startTransition } =
    usePillarRoutesContext();

  const [items, setItems] = useState(labeledItems);
  useEffect(() => {
    if (labeledItems.length > 0 && !isLoading) {
      setItems(labeledItems);
    }
  }, [labeledItems, isLoading]);

  const icon = isLoading ? <Spinner size="sm" color="white" /> : <SearchIcon />;

  const router = useRouter();
  const onClose = (item: LabeledItem) => {
    setItems((prev) => prev.filter((prevItem) => prevItem.slug !== item.slug));
    startTransition(() => {
      router.push(item.href);
    });
  };

  return (
    <div
      className={cn(
        'flex w-fit min-w-96 max-w-6xl items-center gap-2 rounded-xl bg-white/10 px-3 py-1',
        { 'opacity-60 pointer-events-none': isLoading },
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <p>{'<PillarSearchInput />'}</p>
      </div>

      {items.length > 0 && (
        <DraggableWrapper>
          <div className="flex items-center gap-x-4">
            {items.map((item) => (
              <PillarSearchInputItem
                key={item.slug}
                item={item}
                isLoading={isLoading}
                onClose={onClose}
              />
            ))}
          </div>
        </DraggableWrapper>
      )}

      {isLoading && <Skeleton className="flex h-7 w-20 rounded-lg" />}
    </div>
  );
};
