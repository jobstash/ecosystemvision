import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { searchQueryKeys } from '@/search/core/query-keys';
import { getPillarInfo } from '@/search/data/get-pillar-info';

export const usePillarInfo = (nav: string) => {
  const { pillar, item, pillar2, item2 } = useParams();

  const isEnabled = typeof pillar === 'string' && typeof item === 'string';

  const params = {
    nav,
    pillar: pillar as string,
    item: item as string,
    pillar2: pillar2 as string,
    item2: item2 as string,
  };

  return useQuery({
    queryKey: searchQueryKeys.getPillarInfo(params),
    queryFn: async () => getPillarInfo(params),
    enabled: isEnabled,
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
