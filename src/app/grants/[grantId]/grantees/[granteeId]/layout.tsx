import { getGrantDetails } from '@/grants/data/get-grant-details';
import { getGranteeDetails } from '@/grants/data/get-grantee-details';

import { GranteePageLayout } from '@/grants/pages/grantee-page-layout';

interface Props {
  children: React.ReactNode;
  params: { grantId: string; granteeId: string };
}

const GranteePage = async ({
  children,
  params: { grantId, granteeId },
}: Props) => {
  const baseHref = `/grants/${grantId}/grantees/${granteeId}/projects`;

  const grant = await getGrantDetails(grantId);
  const grantee = await getGranteeDetails(grant.data.id);

  return (
    <GranteePageLayout baseHref={baseHref} grantee={grantee.data}>
      {children}
    </GranteePageLayout>
  );
};

export default GranteePage;
