'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAsyncList } from 'react-stately';

import { Input } from '@nextui-org/input';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
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
const DEBOUNCE_DELAY = 300;

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

      console.log({ cursor, pageOffset, page });

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

  const pillarItemsSet = useMemo(
    () => new Set(pillarItems.map(({ label }) => normalizeString(label))),
    [pillarItems],
  );

  const dropdownItems = useMemo(
    () => {
      const hiddenItemsCopy = [...hiddenItems];
      hiddenItemsCopy.reverse();

      const dedupedItems = list.items.filter(
        (label) =>
          !pillarItemsSet.has(normalizeString(label)) &&
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
  }, [hiddenItems.length]);

  const itemSlugsSet = useMemo(
    () => new Set(activeItems.map(({ label }) => normalizeString(label))),
    [activeItems],
  );

  const onAction = (key: React.Key) => {
    if (key) {
      const itemSlug = normalizeString(key as string);
      const isActive = itemSlugsSet.has(itemSlug);
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
          disabledKeys={['no-results']}
          onAction={onAction}
        >
          {dropdownItems.length > 0 ? (
            dropdownItems.map((label, i) => {
              const isActive = itemSlugsSet.has(normalizeString(label));

              return (
                <ListboxItem
                  key={label}
                  className={cn({
                    'text-accent2 font-bold bg-accent2/5': isActive,
                  })}
                  classNames={{
                    base: 'py-3',
                  }}
                  endContent={isActive ? <CheckmarkIcon /> : null}
                  textValue={label}
                >
                  <div
                    key={label}
                    ref={i === dropdownItems.length - 1 ? inViewRef : undefined}
                  >
                    {label}
                  </div>
                </ListboxItem>
              );
            })
          ) : (
            <ListboxItem key={'no-results'} value="no-results">
              {list.isLoading ? 'Loading items ...' : 'No results found'}
            </ListboxItem>
          )}
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
