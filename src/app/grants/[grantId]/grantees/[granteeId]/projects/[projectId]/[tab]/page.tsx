import { getGranteeProject } from '@/grants/data/get-grantee-project';
import { GranteeProjectStats } from '@/grants/components/grantee-project/project-stats';

interface Props {
  params: {
    projectId: string;
    tab: string;
  };
}

const GranteeProjectTabsPage = async ({
  params: { projectId, tab },
}: Props) => {
  const { data } = await getGranteeProject(projectId);

  const projectTab = data.tabs.find((t) => t.tab === tab);
  if (!projectTab) return null;

  return <GranteeProjectStats stats={projectTab.stats} />;
};

export default GranteeProjectTabsPage;
