import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { searchQueryKeys } from '@/search/core/query-keys';
import { searchQueryAtom } from '@/search/core/atoms';
import { search } from '@/search/data/search';

export const useSearchResults = () => {
  const query = useAtomValue(searchQueryAtom);

  const fetchResult = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: searchQueryKeys.search(query.toLowerCase()),
    queryFn: () => search(query),
    staleTime: QUERY_STALETIME.DEFAULT,
  });

  return {
    query,
    ...fetchResult,
  };
};
