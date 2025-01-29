'use client';

import { usePillarFilters } from '@/search/hooks/use-pillar-filters';
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
  const { data } = usePillarFilters(nav);

  const filterConfigs = data?.filter((d) => !EXCLUDED_KINDS.has(d.kind)) ?? [];

  return (
    <div className="relative flex min-h-screen justify-center bg-neutral-900 pb-24">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <PillarAllFiltersHeader />

        {filterConfigs.map((item) => (
          <FilterMapper key={item.label} item={item} />
        ))}

        {pillarSelections.map(({ pillar, items }) => (
          <PillarSelection key={pillar} pillar={pillar} items={items} />
        ))}
      </div>
    </div>
  );
};

const EXCLUDED_KINDS = new Set(['ORDER', 'ORDER_BY']);
