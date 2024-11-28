import { AppHeader } from '@/shared/components/app-header';

import { PlainSearchInput } from '@/search/components/plain-search-input';
import { SearchResults } from '@/search/components/search-results';

export const SearchPage = () => {
  return (
    <AppHeader input={<PlainSearchInput />} searchResults={<SearchResults />} />
  );
};
