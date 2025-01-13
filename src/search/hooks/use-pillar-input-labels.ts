import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { searchQueryKeys } from '@/search/core/query-keys';
import { getPillarInputLabels } from '@/search/data/get-pillar-input-labels';

export const usePillarInputLabels = (
  inputs: { slug: string; href: string }[],
) => {
  return useQuery({
    queryKey: searchQueryKeys.getPillarInputLabels(inputs),
    queryFn: async () => getPillarInputLabels(inputs),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
