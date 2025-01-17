'use client';

import { Fragment } from 'react';

import { Divider } from '@/shared/components/divider';

import { PillarSearchNavFilter } from '@/search/core/types';
import { useSearchResults } from '@/search/hooks/use-search-results';
import { SearchResult } from '@/search/components/search-result';
import { SearchResultsSkeleton } from '@/search/components/search-results-skeleton';

interface Props {
  nav?: PillarSearchNavFilter;
}

export const SearchResults = ({ nav }: Props) => {
  const { query, data } = useSearchResults(nav);

  if (!data) return <SearchResultsSkeleton />;

  return (
    <div className="flex flex-col gap-6 py-8 pb-12 md:gap-8">
      {data.map(({ title, items }) => (
        <Fragment key={title}>
          <Divider />
          <SearchResult query={query} title={title} items={items} />
        </Fragment>
      ))}
      <Divider />
    </div>
  );
};
