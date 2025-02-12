import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { searchQueryKeys } from '@/search/core/query-keys';
import { GetPillarFiltersProps } from '@/search/core/types';
import { getPillarFilters } from '@/search/data/get-pillar-filters';

export const usePillarFilters = (props: GetPillarFiltersProps) => {
  return useQuery({
    queryKey: searchQueryKeys.getPillarFilters(props),
    queryFn: async () => getPillarFilters(props),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
