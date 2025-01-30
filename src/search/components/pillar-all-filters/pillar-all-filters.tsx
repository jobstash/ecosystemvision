'use client';

import { useEffect, useState } from 'react';

import { useSetAtom } from 'jotai';

import { currentFilterParamsAtom } from '@/search/core/atoms';
import { usePillarFilters } from '@/search/hooks/use-pillar-filters';
import { usePillarSearchParams } from '@/search/hooks/use-pillar-search-params';
import { FilterMapper } from '@/search/components/pillar-all-filters/filter-mapper';

import { PillarAllFiltersHeader } from './header';
import { PillarSelection } from './pillar-selection';

interface Props {
  nav: string;
  pillarSelections: {
    pillar: string;
    items: { label: string; slug: string; isActive: boolean }[];
  }[];
}

export const PillarAllFilters = ({ nav, pillarSelections }: Props) => {
  const { data: filterConfigs = [] } = usePillarFilters(nav);

  const activeSearchParams = usePillarSearchParams();
  const setCurrentFilterParams = useSetAtom(currentFilterParamsAtom);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      setCurrentFilterParams(activeSearchParams);
    }
  }, [activeSearchParams, initialized, setCurrentFilterParams]);

  return (
    <div className="relative flex min-h-screen justify-center bg-neutral-900 pb-24">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <PillarAllFiltersHeader activeSearchParams={activeSearchParams} />

        {filterConfigs.map((item) => (
          <FilterMapper key={item.label} item={item} />
        ))}

        {pillarSelections.map(({ pillar, items }) => (
          <PillarSelection
            key={pillar}
            nav={nav}
            pillar={pillar}
            activeLabels={items
              .filter((item) => item.isActive)
              .map(({ label }) => label)}
          />
        ))}
      </div>
    </div>
  );
};
