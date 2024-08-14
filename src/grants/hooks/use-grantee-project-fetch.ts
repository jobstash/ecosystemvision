import { useGranteeFetch } from '@/grants/hooks/use-grantee-fetch';
import { useGranteeProject } from '@/grants/hooks/use-grantee-project';

interface Props {
  grantId: string;
  granteeId?: string;
  projectId?: string;
}

export const useGranteeProjectFetch = (props: Props) => {
  const { grantId, granteeId, projectId } = props;

  const {
    granteeData,
    isLoading: isLoadingGranteeFetch,
    errorMessage: granteeFetchError,
  } = useGranteeFetch(grantId, granteeId);

  const defaultProjectId = granteeData?.data.projects[0];
  const {
    data: projectData,
    isLoading: isLoadingProject,
    error,
  } = useGranteeProject(projectId || defaultProjectId);

  const isLoading = isLoadingGranteeFetch || isLoadingProject;
  const errorMessage = granteeFetchError || error?.message;

  return {
    granteeData,
    projectData,
    isLoading,
    errorMessage,
  };
};
