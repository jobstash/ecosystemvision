import { getGrantDetails } from '@/grants/data/get-grant-details';

import { GrantPageLayout } from '@/grants/pages/grant-page-layout';

interface Props {
  children: React.ReactNode;
  list: React.ReactNode;
  params: { grantId: string };
}

const Layout = async ({ children, list, params: { grantId } }: Props) => {
  const data = await getGrantDetails(grantId);

  return (
    <GrantPageLayout grant={data} list={list}>
      {children}
    </GrantPageLayout>
  );
};

export default Layout;
