'use client';

import { Fragment } from 'react';

import { Divider } from '@/shared/components/divider';

import { useSearchResults } from '@/search/hooks/use-search-results';
import { SearchResult } from '@/search/components/search-result';

import { SearchResultsSkeleton } from './search-results-skeleton';

interface Props {
  nav?: string;
  excluded?: string;
  isPillarSearchResult?: boolean;
}

export const SearchResults = ({
  nav,
  excluded,
  isPillarSearchResult,
}: Props) => {
  const { query, data } = useSearchResults(nav, excluded);

  if (!data) return <SearchResultsSkeleton />;

  if (data.length === 0)
    return (
      <div className="py-8">
        <p>No results found.</p>
      </div>
    );

  return (
    <div className="-mr-4 flex flex-col gap-6  px-4 pb-8 md:gap-8 lg:mx-0 lg:pb-12 lg:pl-12 lg:pr-8">
      <div className="glow-background top-0 lg:w-[calc(100vw-236px)]"></div>
      <div className="fixed left-[236px] top-0 z-[999] h-screen w-6 bg-gradient-to-r from-[#070708] to-[#101012]"></div>
      {data.map(({ title, items }) => (
        <Fragment key={title}>
          <Divider />
          <SearchResult
            isPillarSearchResult={isPillarSearchResult}
            query={query}
            title={title}
            items={items}
          />
        </Fragment>
      ))}
      <Divider />
    </div>
  );
};
