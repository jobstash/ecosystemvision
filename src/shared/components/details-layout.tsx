import { AppHeader } from '@/shared/components/app-header';
import { BackButton } from '@/shared/components/app-header/back-button';
import { DetailsTabs } from '@/shared/components/details-tabs';
import { Divider } from '@/shared/components/divider';
import { ScrollToTop } from '@/shared/components/scroll-to-top';

import { ActiveSearchHiddenWrapper } from '@/search/components/active-search-hidden-wrapper';
import { DetailsSearchResults } from '@/search/components/details-search-results';
import { PillarLoadingWrapper } from '@/search/components/pillar-loading-wrapper';

interface Props {
  nav: string;
  header: React.ReactNode;
  tabs: { key: string; text: string; href: string }[];
  children: React.ReactNode;
}

export const DetailsLayout = (props: Props) => {
  const { nav, header, tabs, children } = props;

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <AppHeader
        showSearchButton
        input={<BackButton nav={nav} />}
        searchResults={<DetailsSearchResults nav={nav} />}
      />
      <ActiveSearchHiddenWrapper>
        <PillarLoadingWrapper>
          <div className="flex max-w-4xl flex-col gap-4 bg-yellow-400 p-8">
            {header}
            <Divider />
            <DetailsTabs tabs={tabs} />
            <div className="px-1">{children}</div>
          </div>
        </PillarLoadingWrapper>
      </ActiveSearchHiddenWrapper>
    </div>
  );
};
