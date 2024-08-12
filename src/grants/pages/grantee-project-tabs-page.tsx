import { GranteeProjectStat } from '@/grants/core/schemas';
import { GranteeProjectStats } from '@/grants/components/grantee-project/project-stats';

interface Props {
  stats: GranteeProjectStat[];
}

export const GranteeProjectTabsPage = async ({ stats }: Props) => {
  return <GranteeProjectStats stats={stats} />;
};
