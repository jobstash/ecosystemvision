import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { grantQueryKeys } from '@/grants/core/query-keys';
import { getGranteeProject } from '@/grants/data/get-grantee-project';

export const useGranteeProject = (projectId?: string) => {
  return useQuery({
    queryKey: grantQueryKeys.project(projectId!),
    queryFn: () => getGranteeProject(projectId!),
    staleTime: QUERY_STALETIME.DEFAULT,
    enabled: !!projectId,
  });
};
