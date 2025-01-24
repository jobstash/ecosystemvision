import { Divider } from '@/shared/components/divider';

import { CheckboxFilters } from '@/search/components/pillar-all-filters/checkbox-filters';
import { PillarSelection } from '@/search/components/pillar-all-filters/pillar-selection';

import { CloseButton } from './close-button';
import { dummyCheckboxFilters, dummyPillarFilters } from './dummy';

export const PillarAllFilters = () => {
  return (
    <div className="relative flex min-h-screen justify-center bg-neutral-900 pb-24 pt-8">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-bold">All Filters</h2>
          <CloseButton />
        </div>
        <Divider />

        {dummyCheckboxFilters.map(({ label, items }) => (
          <CheckboxFilters key={label} label={label} items={items} />
        ))}

        {dummyPillarFilters.map(({ pillar, items }) => (
          <PillarSelection key={pillar} pillar={pillar} items={items} />
        ))}
      </div>
    </div>
  );
};
