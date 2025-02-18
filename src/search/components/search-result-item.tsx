'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@heroui/button';
import { useSetAtom } from 'jotai';

import { TSearchResultItem } from '@/search/core/schemas';
import { isActiveSearchAtom, searchQueryAtom } from '@/search/core/atoms';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

const escapeRegExp = (str: string): string =>
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query) return text;

  const escapedQuery = escapeRegExp(query);
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return (
    <div className="">
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="font-semibold text-accent2">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </div>
  );
};

interface Props extends TSearchResultItem {
  query: string;
  isPillarSearchResult?: boolean;
}

export const SearchResultItem = ({
  label,
  href,
  query,
  isPillarSearchResult,
}: Props) => {
  const router = useRouter();
  const { isPendingRoute: isPendingPillarRoute, startTransition } =
    usePendingRoute();

  const setSearchQuery = useSetAtom(searchQueryAtom);

  // Pillar pages append the item to the search params
  const finalHref = useMemo(
    () => getFinalHref(href, isPillarSearchResult),
    [href, isPillarSearchResult],
  );

  const setIsActive = useSetAtom(isActiveSearchAtom);
  const onClick = () => {
    setSearchQuery({ actual: '', debounced: '' });
    setIsActive(false);
    startTransition(() => {
      router.push(finalHref);
      router.refresh();
    });
  };

  return (
    <Button
      size="sm"
      className="shrink-0"
      isDisabled={isPendingPillarRoute}
      onClick={onClick}
    >
      <span className="text-13">{highlightText(label, query)}</span>
    </Button>
  );
};

/**
 * Search result item's href depends if it's from the search page or from a pillar page.
 * If it's from a pillar page, the item is appended to the search params.
 * @param href search-pillar-item href
 * @param isPillarSearchResult if needed to append the search-pillar-item to the search params
 * @returns final href string
 */
const getFinalHref = (href: string, isPillarSearchResult?: boolean) => {
  if (!isPillarSearchResult) return href;

  const pathParts = href.split('/');
  const pillar = pathParts[2] || null;
  const item = pathParts[3] || null;

  if (!pillar || !item) {
    throw new Error(`Invalid search-result-item appended href: ${href}`);
  }

  const currentUrl = new URL(window.location.href);
  const currentValues = currentUrl.searchParams.get(pillar);

  const isIndex = currentUrl.pathname.split('/').length < 3;
  if (isIndex) return href;

  if (currentValues) {
    const updatedValues = new Set(currentValues.split(',').concat(item));
    currentUrl.searchParams.set(pillar, Array.from(updatedValues).join(','));
  } else {
    currentUrl.searchParams.set(pillar, item);
  }

  return currentUrl.toString();
};
