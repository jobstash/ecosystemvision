import { getGranteeDetails } from '@/grants/data/get-grantee-details';

import { GranteePageLayout } from '@/grants/pages/grantee-page-layout';

interface Props {
  children: React.ReactNode;
  params: { grantId: string; granteeId: string };
}

const Layout = async ({ children, params: { grantId, granteeId } }: Props) => {
  const baseHref = `/grants/${grantId}/grantees/${granteeId}/projects`;

  const grantee = await getGranteeDetails(granteeId);

  return (
    <GranteePageLayout baseHref={baseHref} grantee={grantee.data}>
      {children}
    </GranteePageLayout>
  );
};

export default Layout;
