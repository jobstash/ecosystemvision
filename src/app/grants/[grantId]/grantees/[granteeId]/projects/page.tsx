import { getGranteeDetails } from '@/grants/data/get-grantee-details';

import { GranteeDefaultSection } from '@/grants/pages/grantee-default-section';

interface Props {
  params: { grantId: string; granteeId: string };
}

const Page = async ({ params: { grantId, granteeId } }: Props) => {
  const { data } = await getGranteeDetails(granteeId);
  return <GranteeDefaultSection grantId={grantId} grantee={data} />;
};

export default Page;
