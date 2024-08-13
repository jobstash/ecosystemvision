import { getDefaultGrantee } from '@/grants/data/get-default-grantee';
import { getGranteeProject } from '@/grants/data/get-grantee-project';

import { GranteeDefaultSection } from '@/grants/pages/grantee-default-section';

interface Props {
  params: { grantId: string };
}

const Page = async ({ params: { grantId } }: Props) => {
  const grantee = await getDefaultGrantee(grantId);

  if (!grantee) return <p>TODO: Empty Default Grantee UI</p>;

  // Default to the first project
  const project = await getGranteeProject(grantee.id);
  const stats = project.data.tabs[0].stats;

  return (
    <GranteeDefaultSection grantId={grantId} grantee={grantee} stats={stats} />
  );
};
export default Page;
