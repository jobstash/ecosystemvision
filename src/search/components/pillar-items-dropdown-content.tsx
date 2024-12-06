'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAsyncList } from 'react-stately';

import { Input } from '@nextui-org/input';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { PopoverContent } from '@nextui-org/popover';
import { ScrollShadow } from '@nextui-org/scroll-shadow';

import { cn } from '@/shared/utils/cn';
import { normalizeString } from '@/shared/utils/normalize-string';

import { TPillarItem } from '@/search/core/types';
import { convertSlugToTitle } from '@/search/utils/convert-slug-to-title';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

const ITEMS_PER_PAGE = 10;
interface Props {
  pillarSlug: string;
  itemParam: string;
  items: TPillarItem[];
}

export const PillarItemsDropdownContent = ({
  pillarSlug,
  itemParam,
  items,
}: Props) => {
  const router = useRouter();
  const { isPendingPillarRoute, startTransition } = usePillarRoutesContext();

  const [searchTerm, setSearchTerm] = useState('');

  const list = useAsyncList<TPillarItem, number>({
    async load({ cursor, filterText }) {
      const filtered = items.filter(({ label }) =>
        label.toLowerCase().includes(filterText?.toLowerCase() ?? ''),
      );

      const start = cursor || 0;
      const paginatedItems = filtered.slice(start, start + ITEMS_PER_PAGE);
      const nextCursor = start + ITEMS_PER_PAGE;

      return {
        items: paginatedItems,
        cursor: nextCursor,
      };
    },
  });

  useEffect(() => {
    list.setFilterText(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const { ref: inViewRef } = useInView({
    threshold: 0.4,
    onChange(inView) {
      if (inView) {
        list.loadMore();
      }
    },
  });

  const onAction = (key: React.Key) => {
    const item = items.find(({ label }) => normalizeString(label) === key);
    if (item) {
      startTransition(() => {
        router.push(item.href);
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const pillarName = convertSlugToTitle(pillarSlug);

  return (
    <PopoverContent className="flex flex-col gap-4 p-4">
      <Input
        radius="sm"
        placeholder={`Search ${pillarName} ...`}
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label={`Search ${pillarName}`}
        isDisabled={isPendingPillarRoute}
      />
      <ScrollShadow
        className={cn('h-60 w-80', {
          'opacity-60 pointer-events-none': isPendingPillarRoute,
        })}
      >
        <Listbox
          aria-label={`${pillarName} items`}
          disabledKeys={['no-results']}
          onAction={onAction}
        >
          {list.items.length > 0 ? (
            list.items.map(({ label }, i) => {
              const key = normalizeString(label);
              const isActive = key === itemParam;
              return (
                <ListboxItem
                  key={key}
                  className={cn({
                    'text-accent2 font-bold bg-accent2/5': isActive,
                  })}
                  classNames={{
                    base: 'py-3',
                  }}
                  endContent={isActive ? <CheckmarkIcon /> : null}
                >
                  <div
                    key={label}
                    ref={i === list.items.length - 1 ? inViewRef : undefined}
                  >
                    {label}
                  </div>
                </ListboxItem>
              );
            })
          ) : (
            <ListboxItem key={'no-results'} value="no-results">
              No results found
            </ListboxItem>
          )}
        </Listbox>
      </ScrollShadow>
    </PopoverContent>
  );
};

const CheckmarkIcon = () => (
  <svg
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="size-4 stroke-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);
