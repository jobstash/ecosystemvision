import { CheckboxFilters } from './checkbox-filters';
import { dummyCheckboxFilters, dummyPillarFilters } from './dummy';
import { PillarAllFiltersHeader } from './header';
import { PillarSelection } from './pillar-selection';

export const PillarAllFilters = () => {
  return (
    <div className="relative flex min-h-screen justify-center bg-neutral-900 pb-24">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <PillarAllFiltersHeader />

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
