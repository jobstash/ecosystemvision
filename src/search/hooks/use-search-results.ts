import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { searchQueryKeys } from '@/search/core/query-keys';
import { PillarNav } from '@/search/core/types';
import { searchQueryAtom } from '@/search/core/atoms';
import { search } from '@/search/data/search';

export const useSearchResults = (nav?: PillarNav, excluded?: string) => {
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
