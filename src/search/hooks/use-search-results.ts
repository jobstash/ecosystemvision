import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { QUERY_STALETIME } from '@/shared/core/constants';
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { searchQueryKeys } from '@/search/core/query-keys';
import { searchQueryAtom } from '@/search/core/atoms';
import { search } from '@/search/data/search';

export const useSearchResults = () => {
  const query = useAtomValue(searchQueryAtom);
  const debouncedQuery = useDebouncedValue(query, 300);

  const fetchResult = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: searchQueryKeys.search(debouncedQuery.toLowerCase()),
    queryFn: () => search(debouncedQuery),
    staleTime: QUERY_STALETIME.DEFAULT,
  });

  return {
    query,
    ...fetchResult,
  };
};
