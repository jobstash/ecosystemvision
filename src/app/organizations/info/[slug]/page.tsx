import { getOrgDetails } from '@/orgs/data/get-org-details';
import { OrgDetailsOverview } from '@/orgs/components/org-details-overview';

interface Props {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const org = await getOrgDetails(slug);
  return <OrgDetailsOverview org={org} />;
};

export default Page;
