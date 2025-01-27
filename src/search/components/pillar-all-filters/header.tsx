import { Divider } from '@/shared/components/divider';

import { CloseButton } from './close-button';

export const PillarAllFiltersHeader = () => {
  return (
    <div className="sticky top-0 z-50 space-y-4 bg-neutral-900 pt-8">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-bold">All Filters</h2>
        <CloseButton />
      </div>
      <Divider />
    </div>
  );
};
