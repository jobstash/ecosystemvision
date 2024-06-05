import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { orgQueryKeys } from '@/orgs/core/query-keys';
import { getOrgDetails } from '@/orgs/data/get-org-details';

export const useOrgDetails = (slug: string) => {
  return useQuery({
    queryKey: orgQueryKeys.details(slug),
    queryFn: () => getOrgDetails(slug),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
