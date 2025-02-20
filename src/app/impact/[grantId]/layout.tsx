import { getGrantDetails } from '@/grants/data/get-grant-details';

import { GrantPageLayout } from '@/grants/pages/grant-page-layout';

interface Props {
  children: React.ReactNode;
  list: React.ReactNode;
  params: Promise<{ grantId: string }>;
}

const Layout = async ({
  // children,
  // list,
  params,
}: Props) => {
  const { grantId } = await params;
  const data = await getGrantDetails(grantId);

  // return <pre>{JSON.stringify({ grantId, data }, null, '\t')}</pre>;

  return (
    <GrantPageLayout grant={data} list={null}>
      {/* {children} */}
      <p>{'<GrantPageLayout /> {children}'}</p>
    </GrantPageLayout>
  );
};

export default Layout;
