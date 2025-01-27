import { Button } from '@heroui/button';

import { CaretDownIcon } from '@/shared/components/icons/caret-down-icon';

import { PillarAllFiltersTrigger } from '@/search/components/pillar-all-filters/trigger';
import { PillarLoadingWrapper } from '@/search/components/pillar-loading-wrapper';
import { PillarOrderButton } from '@/search/components/pillar-order-button';

interface Props {
  children: React.ReactNode;
  nav: string;
}

export const PillarFilters = (props: Props) => {
  const { children, nav } = props;

  return (
    <PillarLoadingWrapper>
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 px-3 py-4">
        <div className="flex items-center gap-8">
          <span className="text-sm">Other Filters</span>
          <div className="flex gap-4">{children}</div>
        </div>
        <div className="flex items-center gap-4">
          <PillarOrderButton nav={nav} />
          <Button endContent={<CaretDownIcon />}>Sort By</Button>
          <PillarAllFiltersTrigger />
        </div>
      </div>
    </PillarLoadingWrapper>
  );
};
