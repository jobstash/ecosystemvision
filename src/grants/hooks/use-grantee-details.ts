import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGranteeDetails } from '@/grants/data/get-grantee-details';

export const useGranteeDetails = (grantId: string, granteeId?: string) => {
  return useQuery({
    queryKey: grantQueryKeys.grantee(grantId, granteeId!),
    queryFn: () => getGranteeDetails(grantId, granteeId!),
    staleTime: QUERY_STALETIME.DEFAULT,
    enabled: !!granteeId,
  });
};
