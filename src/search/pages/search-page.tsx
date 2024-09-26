import { SearchInput } from '@/search/components/search-input';
import { SearchResults } from '@/search/components/search-results';

export const SearchPage = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <SearchInput />
      <SearchResults />
    </div>
  );
};
