import { notFound } from 'next/navigation';

import { getOrgDetails } from '@/orgs/data/get-org-details';
import { getOrgTeam } from '@/orgs/data/get-org-team';
import { OrgDetailsInvestments } from '@/orgs/components/org-details-investments';
import { OrgDetailsJobs } from '@/orgs/components/org-details-jobs';
import { OrgDetailsProjects } from '@/orgs/components/org-details-projects';
import { OrgDetailsTeam } from '@/orgs/components/org-details-team';

interface Props {
  params: Promise<{ slug: string; tab: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const Page = async ({ params, searchParams }: Props) => {
  const [{ slug, tab }, query] = await Promise.all([params, searchParams]);

  const org = await getOrgDetails(slug);
  const hasProjects = org.projects.length > 0;
  const hasJobs = org.jobs.length > 0;

  if (tab.toLowerCase() === 'investments') {
    return <OrgDetailsInvestments org={org} />;
  }

  if (tab.toLowerCase() === 'projects' && hasProjects) {
    return <OrgDetailsProjects org={org} />;
  }

  if (tab.toLowerCase() === 'team' && org.teamCoverageStatus === 'current') {
    const rawPage = Array.isArray(query.teamPage)
      ? query.teamPage[0]
      : query.teamPage;
    const requestedPage = Number(rawPage);
    const page =
      Number.isSafeInteger(requestedPage) && requestedPage > 0
        ? requestedPage
        : 1;
    const team = await getOrgTeam(slug, page);
    return <OrgDetailsTeam slug={slug} page={page} team={team} />;
  }

  if (tab.toLowerCase() === 'jobs' && hasJobs) {
    return <OrgDetailsJobs org={org} />;
  }

  notFound();
};

export default Page;
