import { Suspense } from 'react';

import { PillarAllFiltersTrigger } from '@/search/components/pillar-all-filters/trigger';
import { PillarLoadingWrapper } from '@/search/components/pillar-loading-wrapper';
import { PillarOrderButton } from '@/search/components/pillar-order-button';
import { PillarSortByButton } from '@/search/components/pillar-sort-by-button';

interface Props {
  children: React.ReactNode;
  nav: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
}

export const PillarFilters = (props: Props) => {
  const { children, nav, params, searchParams } = props;

  return (
    <PillarLoadingWrapper>
      <div className="flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/15 px-3 py-4">
        <div className="flex items-center gap-8">
          <span className="text-sm">Other Filters</span>
          <div className="flex gap-4">{children}</div>
        </div>
        <Suspense>
          <div className="flex items-center gap-4">
            <PillarOrderButton
              nav={nav}
              params={params}
              searchParams={searchParams}
            />
            <PillarSortByButton
              nav={nav}
              params={params}
              searchParams={searchParams}
            />
            <PillarAllFiltersTrigger
              nav={nav}
              params={params}
              searchParams={searchParams}
            />
          </div>
        </Suspense>
      </div>
    </PillarLoadingWrapper>
  );
};
