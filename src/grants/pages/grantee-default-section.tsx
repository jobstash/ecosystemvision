import { Grantee } from '@/grants/core/schemas';

import { GranteePageLayout } from '@/grants/pages/grantee-page-layout';

interface Props {
  grantId: string;
  grantee: Grantee;
}

/**
 * Display first grantee details by default for the following routes:
 * - /grants/:grantId
 * - /grants/:grantId/grantees
 * - /grants/:grantId/grantees/:granteeId
 * - /grants/:grantId/grantees/:granteeId/projects
 * */
export const GranteeDefaultSection = ({ grantId, grantee }: Props) => {
  // TODO: JOB-683
  // TODO: JOB-684

  const baseHref = `/grants/${grantId}/grantees/${grantee.id}/projects`;

  return (
    <GranteePageLayout baseHref={baseHref} grantee={grantee}>
      <p>TODO: IDK</p>
    </GranteePageLayout>
  );
};
