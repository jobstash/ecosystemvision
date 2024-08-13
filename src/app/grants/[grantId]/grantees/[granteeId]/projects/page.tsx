import { getGranteeDetails } from '@/grants/data/get-grantee-details';
import { getGranteeProject } from '@/grants/data/get-grantee-project';

import { GranteeDefaultSection } from '@/grants/pages/grantee-default-section';

interface Props {
  params: { grantId: string; granteeId: string };
}

const Page = async ({ params: { grantId, granteeId } }: Props) => {
  const { data: grantee } = await getGranteeDetails(granteeId);

  // Default to the first project
  const project = await getGranteeProject(grantee.id);
  const stats = project.data.tabs[0].stats;

  return (
    <GranteeDefaultSection grantId={grantId} grantee={grantee} stats={stats} />
  );
};

export default Page;
