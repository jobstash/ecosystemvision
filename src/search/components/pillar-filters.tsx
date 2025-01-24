import { Button } from '@heroui/button';

import { CaretDownIcon } from '@/shared/components/icons/caret-down-icon';
import { CaretRightIcon } from '@/shared/components/icons/caret-right-icon';

interface Props {
  children: React.ReactNode;
}

export const PillarFilters = (props: Props) => {
  const { children } = props;

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 px-3 py-4">
      <div className="flex items-center gap-8">
        <span className="text-sm">Other Filters</span>
        <div className="flex gap-4">{children}</div>
      </div>
      <div className="flex gap-4">
        <Button endContent={<CaretDownIcon />}>Sort By</Button>
        <Button endContent={<CaretRightIcon />}>All Filters</Button>
      </div>
    </div>
  );
};
