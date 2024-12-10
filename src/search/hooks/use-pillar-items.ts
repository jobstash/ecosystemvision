import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { searchQueryKeys } from '@/search/core/query-keys';
import { GetPillarItemsProps } from '@/search/core/types';
import { getPillarItems } from '@/search/data/get-pillar-items';

export const usePillarItems = (props: GetPillarItemsProps) => {
  return useQuery({
    queryKey: searchQueryKeys.getPillarItems(props),
    queryFn: async () => getPillarItems(props),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
