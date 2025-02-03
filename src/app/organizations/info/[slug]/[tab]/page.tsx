import { notFound } from 'next/navigation';

import { getOrgDetails } from '@/orgs/data/get-org-details';
import { OrgDetailsInvestments } from '@/orgs/components/org-details-investments';
import { OrgDetailsJobs } from '@/orgs/components/org-details-jobs';
import { OrgDetailsProjects } from '@/orgs/components/org-details-projects';

interface Props {
  params: Promise<{ slug: string; tab: string }>;
}

const Page = async ({ params }: Props) => {
  const { slug, tab } = await params;

  const org = await getOrgDetails(slug);
  const hasProjects = org.projects.length > 0;
  const hasJobs = org.jobs.length > 0;

  if (tab.toLowerCase() === 'investments') {
    return <OrgDetailsInvestments org={org} />;
  }

  if (tab.toLowerCase() === 'projects' && hasProjects) {
    return <OrgDetailsProjects org={org} />;
  }

  if (tab.toLowerCase() === 'jobs' && hasJobs) {
    return <OrgDetailsJobs org={org} />;
  }

  notFound();
};

export default Page;
