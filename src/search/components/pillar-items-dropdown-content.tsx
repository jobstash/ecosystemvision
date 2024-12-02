'use client';

import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

import { Input } from '@nextui-org/input';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { PopoverContent } from '@nextui-org/popover';
import { ScrollShadow } from '@nextui-org/scroll-shadow';

import { cn } from '@/shared/utils/cn';
import { normalizeString } from '@/shared/utils/normalize-string';

import { TPillarItem } from '@/search/core/types';
import { convertSlugToTitle } from '@/search/utils/convert-slug-to-title';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

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

  // Filtered items based on the search term
  const filteredItems = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return items.filter(({ label }) =>
      label.toLowerCase().includes(lowercasedSearchTerm),
    );
  }, [items, searchTerm]);

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
          {filteredItems.length > 0 ? (
            filteredItems.map(({ label }) => {
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
                  {label}
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
