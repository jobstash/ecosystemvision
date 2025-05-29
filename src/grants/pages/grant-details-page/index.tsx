import { AppHeader } from '@/shared/components/app-header';
import { AppHeaderBackButton } from '@/shared/components/app-header/app-header-back-button';
import { ScrollToTop } from '@/shared/components/scroll-to-top';

import { Grant } from '@/grants/core/schemas';
import { FullGrantCard } from '@/grants/components/grant-card/full-grant-card';
import { ActiveSearchHiddenWrapper } from '@/search/components/active-search-hidden-wrapper';
import { ActiveSearchResults } from '@/search/components/active-search-results';
import { SearchResultInput } from '@/search/components/search-result-input';

interface Props {
  grant: Grant;
}

export const GrantDetailsPage = ({ grant }: Props) => {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <AppHeader
        input={<SearchResultInput />}
        backButton={<AppHeaderBackButton nav="grants" />}
        searchResults={<ActiveSearchResults />}
      />
      <ActiveSearchHiddenWrapper>
        <div className="pt-36">
          <FullGrantCard grant={grant} isRounded={false} />
        </div>
      </ActiveSearchHiddenWrapper>
    </div>
  );
};
