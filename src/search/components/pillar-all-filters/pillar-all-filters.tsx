'use client';

import { useCallback, useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import {
  currentFilterParamsAtom,
  PillarFilterState,
} from '@/search/core/atoms';
import { usePillarFilters } from '@/search/hooks/use-pillar-filters';
import { usePillarSearchParams } from '@/search/hooks/use-pillar-search-params';
import { FilterMapper } from '@/search/components/pillar-all-filters/filter-mapper';

import { PillarAllFiltersHeader } from './header';
import { PillarSelection } from './pillar-selection';

interface Props {
  nav: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  pillarSelections: {
    pillar: string;
    items: { label: string; slug: string; isActive: boolean }[];
  }[];
  isPillarPageSelection: boolean;
}

export const PillarAllFilters = ({
  nav,
  params,
  searchParams,
  pillarSelections,
  isPillarPageSelection,
}: Props) => {
  const { data: filterConfigs = [] } = usePillarFilters(nav);

  const activeSearchParams = usePillarSearchParams();
  const [, setCurrentFilterParams] = useAtom(currentFilterParamsAtom);
  const [initialized, setInitialized] = useState(false);

  const resetState = useCallback(() => {
    const pillarKeys = new Set(pillarSelections.map(({ pillar }) => pillar));
    const initFilterParams: PillarFilterState = {};
    Object.entries(activeSearchParams).forEach(([pillar, initValue]) => {
      initFilterParams[pillar] = {
        init: initValue,
        ...(pillarKeys.has(pillar) && {
          current: pillarSelections
            .find((p) => p.pillar === pillar)!
            .items.filter((item) => item.isActive)
            .map((item) => item.label),
        }),
      };
    });

    setCurrentFilterParams(initFilterParams);
  }, [activeSearchParams, pillarSelections, setCurrentFilterParams]);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      resetState();
    }
  }, [initialized, resetState]);

  return (
    <div className="relative flex min-h-screen justify-center bg-neutral-900 pb-24">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <PillarAllFiltersHeader
          nav={nav}
          activeSearchParams={activeSearchParams}
          onClear={resetState}
        />

        {filterConfigs.map((item) => (
          <FilterMapper key={item.label} item={item} />
        ))}

        {pillarSelections.map(({ pillar }) => (
          <PillarSelection
            key={pillar}
            nav={nav}
            pillar={pillar}
            params={params}
            searchParams={searchParams}
            isPillarPageSelection={isPillarPageSelection}
          />
        ))}
      </div>
    </div>
  );
};
