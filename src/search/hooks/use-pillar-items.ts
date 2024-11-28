import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { searchQueryKeys } from '@/search/core/query-keys';
import { GetPillarInfoProps } from '@/search/core/types';
import { getPillarInfo } from '@/search/data/get-pillar-info';

export const usePillarItems = (props: GetPillarInfoProps) => {
  return useQuery({
    queryKey: searchQueryKeys.getPillarItems(props),
    queryFn: async () => getPillarInfo(props),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
