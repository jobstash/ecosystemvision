import { Grantee, GranteeProjectStat } from '@/grants/core/schemas';
import { GranteeProjectStats } from '@/grants/components/grantee-project/project-stats';

import { GranteePageLayout } from '@/grants/pages/grantee-page-layout';

interface Props {
  grantId: string;
  grantee: Grantee;
  stats: GranteeProjectStat[];
}

/**
 * Display first grantee details by default for the following routes:
 * - /grants/:grantId
 * - /grants/:grantId/grantees
 * - /grants/:grantId/grantees/:granteeId
 * - /grants/:grantId/grantees/:granteeId/projects
 * */
export const GranteeDefaultSection = ({ grantId, grantee, stats }: Props) => {
  // TODO: JOB-683
  // TODO: JOB-684

  const baseHref = `/grants/${grantId}/grantees/${grantee.id}/projects`;

  return (
    <GranteePageLayout baseHref={baseHref} grantee={grantee}>
      <GranteeProjectStats stats={stats} />
    </GranteePageLayout>
  );
};
