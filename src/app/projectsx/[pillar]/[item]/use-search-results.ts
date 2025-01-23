import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { searchQueryKeys } from '@/search/core/query-keys';
import { search } from '@/search/data/search';

import { searchQueryAtom } from './atoms';

export const useSearchResults = (nav?: string, excluded?: string) => {
  const { debounced: query } = useAtomValue(searchQueryAtom);

  const fetchResult = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: searchQueryKeys.search(query.toLowerCase(), nav),
    queryFn: () => search({ query, nav, excluded }),
    staleTime: QUERY_STALETIME.DEFAULT,
    enabled: query.length !== 1,
  });

  return {
    query,
    ...fetchResult,
  };
};
