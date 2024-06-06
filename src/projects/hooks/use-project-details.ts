import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { projectQueryKeys } from '@/projects/core/query-keys';
import { getProjectDetails } from '@/projects/data/get-project-details';

export const useProjectDetails = (slug: string) => {
  return useQuery({
    queryKey: projectQueryKeys.details(slug),
    queryFn: () => getProjectDetails(slug),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
