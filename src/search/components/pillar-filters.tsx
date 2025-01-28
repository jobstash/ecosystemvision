import { PillarAllFiltersTrigger } from '@/search/components/pillar-all-filters/trigger';
import { PillarLoadingWrapper } from '@/search/components/pillar-loading-wrapper';
import { PillarOrderButton } from '@/search/components/pillar-order-button';
import { PillarSortByButton } from '@/search/components/pillar-sort-by-button';

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
          <PillarSortByButton nav={nav} />
          <PillarAllFiltersTrigger nav={nav} />
        </div>
      </div>
    </PillarLoadingWrapper>
  );
};
