import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGranteeDetails } from '@/grants/data/get-grantee-details';

export const useGranteeDetails = (granteeId?: string) => {
  return useQuery({
    queryKey: grantQueryKeys.grantee(granteeId!),
    queryFn: () => getGranteeDetails(granteeId!),
    staleTime: QUERY_STALETIME.DEFAULT,
    enabled: !!granteeId,
  });
};
