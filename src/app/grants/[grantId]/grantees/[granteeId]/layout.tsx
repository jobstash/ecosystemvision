import { getGrantDetails } from '@/grants/data/get-grant-details';
import { getGranteeDetails } from '@/grants/data/get-grantee-details';
import { getGranteesList } from '@/grants/data/get-grantees-list';

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
  const grantees = await getGranteesList({ page: 1, grantId: grant.data.id });

  if (grantees.data.length === 0) return <p>TODO: Empty Grantee Details UI</p>;

  const grantee = await getGranteeDetails(grantees.data[0].id);

  return (
    <GranteePageLayout baseHref={baseHref} grantee={grantee.data}>
      {children}
    </GranteePageLayout>
  );
};

export default GranteePage;
