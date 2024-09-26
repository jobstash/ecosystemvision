'use client';

import { Fragment } from 'react';

import { Divider } from '@/shared/components/divider';

import { useSearchResults } from '@/search/hooks/use-search-results';
import { SearchResult } from '@/search/components/search-result';
import { SearchResultsSkeleton } from '@/search/components/search-results-skeleton';

export const SearchResults = () => {
  const { query, data } = useSearchResults();

  if (!data) return <SearchResultsSkeleton />;

  return (
    <div className="flex flex-col gap-8">
      {data.map(({ title: label, categories }) => (
        <Fragment key={label}>
          <Divider />
          <SearchResult query={query} title={label} categories={categories} />
        </Fragment>
      ))}
    </div>
  );
};
