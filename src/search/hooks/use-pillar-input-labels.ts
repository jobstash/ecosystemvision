import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { searchQueryKeys } from '@/search/core/query-keys';
import { GetPillarInputLabelsProps } from '@/search/core/types';
import { getPillarInputLabels } from '@/search/data/get-pillar-input-labels';

export const usePillarInputLabels = (props: GetPillarInputLabelsProps) => {
  return useQuery({
    queryKey: searchQueryKeys.getPillarInputLabels(props),
    queryFn: async () => getPillarInputLabels(props),
    staleTime: QUERY_STALETIME.DEFAULT,
    enabled: props.inputs.length > 0 && props.pillars.length > 0,
  });
};
