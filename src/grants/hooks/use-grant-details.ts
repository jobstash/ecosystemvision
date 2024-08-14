import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGrantDetails } from '@/grants/data/get-grant-details';

export const useGrantDetails = (grantId?: string) => {
  return useQuery({
    queryKey: grantQueryKeys.details(grantId!),
    queryFn: () => getGrantDetails(grantId!),
    staleTime: QUERY_STALETIME.DEFAULT,
    enabled: !!grantId,
  });
};
