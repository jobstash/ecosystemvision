import { Fragment } from 'react';

import { Skeleton } from "@heroui/skeleton";

import { Divider } from '@/shared/components/divider';

import { SearchResultLayout } from '@/search/components/search-result';

export const SearchResultsSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <Fragment key={i}>
          <Divider />
          <SearchResultLayout
            label={<Skeleton className="h-5 w-20 rounded-md" />}
            items={
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-40 rounded-lg" />
                ))}
              </>
            }
          />
        </Fragment>
      ))}
    </div>
  );
};
