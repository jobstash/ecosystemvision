import { SearchInput } from '@/search/components/search-input';
import { SearchResults } from '@/search/components/search-results';

export const SearchPage = () => {
  return (
    <div className="px-5 pt-[56px] md:py-[32px] lg:pl-0 lg:pr-8">
      <div className='pt-2 md:pt-0'>
          <SearchInput />
          <SearchResults />
      </div>
    </div>
  );
};
