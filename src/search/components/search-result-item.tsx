'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@heroui/button';
import { useSetAtom } from 'jotai';

import { TSearchResultItem } from '@/search/core/schemas';
import { searchQueryAtom } from '@/search/core/atoms';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

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
  const { isPendingPillarRoute, startTransition } = usePillarRoutesContext();

  const setSearchQuery = useSetAtom(searchQueryAtom);

  const onClick = () => {
    setSearchQuery({ actual: '', debounced: '' });
    startTransition(() => {
      router.push(href);
    });
  };

  // Pillar pages append the item to the search params
  const finalHref = useMemo(
    () => getFinalHref(href, isPillarSearchResult),
    [href, isPillarSearchResult],
  );

  return (
    <Button
      as={Link}
      href={finalHref}
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
  const currentPillar = currentUrl.pathname.split('/')[2];
  const currentValues = currentUrl.searchParams.get(pillar);
  const pillarMatched = currentPillar === pillar;

  const pillarKey = pillarMatched ? 'include' : pillar;

  if (currentValues) {
    const updatedValues = new Set(currentValues.split(',').concat(item));
    currentUrl.searchParams.set(pillarKey, Array.from(updatedValues).join(','));
  } else {
    currentUrl.searchParams.set(pillarKey, item);
  }

  return currentUrl.toString();
};
