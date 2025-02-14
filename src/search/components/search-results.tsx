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
    <div className="flex flex-col gap-6 md:gap-8  px-4 pb-8 lg:pb-12 -mr-4 lg:pl-12 lg:pr-8 lg:mx-0">
      <div className='glow-background top-0 lg:w-[calc(100vw-236px)]'></div>
      <div className='bg-gradient-to-r top-0 from-[#070708] to-[#101012] h-screen fixed left-[236px] z-[999] w-6'></div>
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
