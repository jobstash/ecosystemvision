import { getDefaultGrantee } from '@/grants/data/get-default-grantee';

import { GranteeDefaultSection } from '@/grants/pages/grantee-default-section';

interface Props {
  params: { grantId: string };
}

const Page = async ({ params: { grantId } }: Props) => {
  const grantee = await getDefaultGrantee(grantId);

  if (!grantee) return <p>TODO: Empty Default Grantee UI</p>;

  return <GranteeDefaultSection grantId={grantId} grantee={grantee} />;
};
export default Page;
