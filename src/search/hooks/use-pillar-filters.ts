import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { searchQueryKeys } from '@/search/core/query-keys';
import { getPillarFilters } from '@/search/data/get-pillar-filters';

export const usePillarFilters = (nav: string) => {
  return useQuery({
    queryKey: searchQueryKeys.getPillarFilters(nav),
    queryFn: async () => getPillarFilters({ nav }),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
