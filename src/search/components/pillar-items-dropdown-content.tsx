'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAsyncList } from 'react-stately';

import { Input } from '@nextui-org/input';
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Spinner } from '@nextui-org/spinner';
import { useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { cn } from '@/shared/utils/cn';
import { normalizeString } from '@/shared/utils/normalize-string';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { searchQueryKeys } from '@/search/core/query-keys';
import { TPillarInfo } from '@/search/core/schemas';
import {
  GetPillarItemsProps,
  PillarParams,
  PillarSearchParams,
  TPillarItem,
} from '@/search/core/types';
import { createPillarItemHref } from '@/search/utils/create-pillar-item-href';
import { createToggledPillarItemSearchParam } from '@/search/utils/create-toggled-pillar-item-search-param';
import { hiddenPillarItemsAtom } from '@/search/core/atoms';
import { getPillarItems } from '@/search/data/get-pillar-items';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

const ITEMS_PER_PAGE = 20;
const DEBOUNCE_DELAY = 500;

interface Props {
  nav: string;
  pillarInfo: TPillarInfo;
  params: PillarParams;
  searchParams: PillarSearchParams;
  pillarSlug: string;
  pillarItems: TPillarItem[];
  activeItems: TPillarItem[];
}

export const PillarItemsDropdownContent = (props: Props) => {
  const {
    pillarSlug,
    activeItems,
    nav,
    pillarInfo,
    pillarItems,
    params,
    searchParams,
  } = props;

  const router = useRouter();
  const queryClient = useQueryClient();

  const pillarParamKey = pillarSlug === params.pillar ? 'include' : pillarSlug;

  const { isPendingPillarRoute, startTransition } = usePillarRoutesContext();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, DEBOUNCE_DELAY);
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const hiddenItemsMap = useAtomValue(hiddenPillarItemsAtom);
  const hiddenItems = hiddenItemsMap[pillarSlug] || [];

  const list = useAsyncList<string, number>({
    async load({ cursor = ITEMS_PER_PAGE, filterText }) {
      const pageOffset = !debouncedQuery ? 1 : 0;
      const page = Math.floor(cursor / ITEMS_PER_PAGE) + pageOffset;

      const queryProps: GetPillarItemsProps = {
        nav,
        pillar: pillarSlug,
        query: filterText || undefined,
        page,
        limit: ITEMS_PER_PAGE,
      };

      const responseItems = await queryClient.fetchQuery({
        queryKey: searchQueryKeys.getPillarItems(queryProps),
        queryFn: async () => getPillarItems(queryProps),
      });

      const start = cursor || ITEMS_PER_PAGE;
      const nextCursor = start + ITEMS_PER_PAGE;

      return {
        items: responseItems,
        cursor: nextCursor,
      };
    },
  });

  const activeItemsSet = useMemo(
    () => new Set(activeItems.map(({ label }) => normalizeString(label))),
    [activeItems],
  );

  const activePillarItems = useMemo(
    () =>
      pillarItems
        .filter((pillarItem) =>
          activeItemsSet.has(normalizeString(pillarItem.label)),
        )
        .map((pillarItem) => pillarItem.label),
    [activeItemsSet, pillarItems],
  );

  const activeDropdownItems = useMemo(
    () => {
      const activeDedupedItems = list.items.filter(
        (label) =>
          activeItemsSet.has(normalizeString(label)) &&
          !activePillarItems.includes(label),
      );

      if (!debouncedQuery) return [...activePillarItems, ...activeDedupedItems];

      const filteredItems = [
        ...activePillarItems,
        ...activeDedupedItems,
      ].filter((item) =>
        item.toLowerCase().includes(debouncedQuery.toLowerCase()),
      );

      return filteredItems;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list.items.length, debouncedQuery, hiddenItems.length],
  );

  const dropdownItems = useMemo(
    () => {
      const hiddenItemsCopy = [...hiddenItems]
        .reverse()
        .filter((label) => !activeDropdownItems.includes(label));

      const dedupedItems = list.items.filter(
        (label) =>
          !activeDropdownItems.includes(label) &&
          !hiddenItemsCopy.includes(label),
      );

      if (!debouncedQuery) return [...hiddenItemsCopy, ...dedupedItems];

      const filteredHiddenItems = hiddenItemsCopy.filter((item) =>
        item.toLowerCase().includes(debouncedQuery.toLowerCase()),
      );

      return [...filteredHiddenItems, ...dedupedItems];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list.items.length, debouncedQuery, hiddenItems.length],
  );

  useEffect(() => {
    list.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItems.length, hiddenItems.length]);

  const onAction = (key: React.Key) => {
    if (key) {
      const itemSlug = normalizeString(key as string);
      const isActive = activeItemsSet.has(itemSlug);
      const newSearchParams = createToggledPillarItemSearchParam({
        itemSlug,
        pillarParamKey,
        isActive,
        searchParams,
      });
      const href = createPillarItemHref(
        {
          nav,
          pillarInfo,
          params,
          searchParams,
        },
        newSearchParams,
      );

      startTransition(() => router.push(href));
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      list.reload();
      list.setFilterText(debouncedQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const { ref: inViewRef } = useInView({
    threshold: 0.4,
    onChange(inView) {
      if (inView && !list.error) {
        list.loadMore();
      }
    },
  });

  return (
    <>
      <Input
        radius="sm"
        placeholder={
          list.isLoading ? 'Loading more items ...' : `Search ${pillarSlug} ...`
        }
        value={query}
        onChange={handleQueryChange}
        aria-label={`Search ${pillarSlug}`}
        isDisabled={isPendingPillarRoute || list.isLoading}
        endContent={list.isLoading ? <Spinner size="sm" color="white" /> : null}
      />
      <ScrollShadow
        className={cn('h-60 w-80', {
          'opacity-60 pointer-events-none': isPendingPillarRoute,
        })}
      >
        <Listbox
          aria-label={`${pillarSlug} items`}
          disabledKeys={['no-results', pillarItems.at(0)?.label ?? '']}
          onAction={onAction}
        >
          <ListboxSection>
            {activeDropdownItems.map((label) => (
              <ListboxItem
                key={label}
                classNames={{
                  base: 'py-3 text-accent2 font-bold bg-accent2/5 hover:bg-accent2/20 data-[hover="true"]:bg-accent2/20',
                }}
                textValue={label}
                endContent={
                  params.item === normalizeString(label) ? (
                    <LockIcon />
                  ) : (
                    <CheckmarkIcon />
                  )
                }
              >
                {label}
              </ListboxItem>
            ))}
          </ListboxSection>

          <ListboxSection>
            {dropdownItems.map((label, i) => (
              <ListboxItem
                key={label}
                classNames={{
                  base: 'py-3',
                }}
                textValue={label}
              >
                <div
                  key={label}
                  ref={i === dropdownItems.length - 1 ? inViewRef : undefined}
                >
                  {label}
                </div>
              </ListboxItem>
            ))}
          </ListboxSection>
        </Listbox>
      </ScrollShadow>
    </>
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

const LockIcon = () => (
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
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);
