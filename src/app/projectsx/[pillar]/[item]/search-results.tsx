'use client';

import { Fragment } from 'react';

import { Divider } from '@/shared/components/divider';

import { SearchResult } from '@/search/components/search-result';

import { SearchResultsSkeleton } from './search-results-skeleton';
import { useSearchResults } from './use-search-results';

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

  return (
    <div className="flex flex-col gap-6 py-8 md:gap-8">
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
