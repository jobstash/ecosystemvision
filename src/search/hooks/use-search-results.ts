import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { searchQueryKeys } from '@/search/core/query-keys';
import { searchQueryAtom } from '@/search/core/atoms';
import { search } from '@/search/data/search';

export const useSearchResults = (nav?: string, excluded?: string) => {
  const { debounced: query } = useAtomValue(searchQueryAtom);

  const fetchResult = useQuery({
    queryKey: searchQueryKeys.search(query.toLowerCase(), nav, excluded),
    queryFn: () => search({ query, nav, excluded }),
    staleTime: QUERY_STALETIME.DEFAULT,
    enabled: query.length !== 1,
  });

  return {
    query,
    ...fetchResult,
  };
};
