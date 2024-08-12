import { getGranteeProject } from '@/grants/data/get-grantee-project';
import { GranteeProjectStats } from '@/grants/components/grantee-project/project-stats';

interface Props {
  params: { grantId: string; granteeId: string; projectId: string };
}

const ProjectIdPage = async ({ params: { projectId } }: Props) => {
  const { data } = await getGranteeProject(projectId);

  if (data.tabs.length === 0) return null;

  return <GranteeProjectStats stats={data.tabs[0].stats} />;
};
export default ProjectIdPage;
