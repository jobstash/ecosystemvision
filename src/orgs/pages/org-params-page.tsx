'use client';

import dynamic from 'next/dynamic';

import { ROUTE_TABS } from '@/shared/core/constants';

import { useOrgDetails } from '@/orgs/hooks/use-org-details';

const OrgDetailsCard = dynamic(() =>
  import('@/orgs/components/org-details-card').then((m) => m.OrgDetailsCard),
);

const ProjectDetailsCards = dynamic(() =>
  import('@/projects/components/project-details-cards').then(
    (m) => m.ProjectDetailsCards,
  ),
);

interface Props {
  params: Promise<{
    slug: string;
    tab: string;
  }>;
}

export const OrgParamsPage = async ({ params }: Props) => {
  const { slug, tab } = await params;
  const { data } = useOrgDetails(slug);

  if (!data) return null;
  if (tab === ROUTE_TABS.SHARED.DETAILS) return <OrgDetailsCard org={data} />;
  if (tab === ROUTE_TABS.ORGS.PROJECTS)
    return <ProjectDetailsCards projects={data.projects} />;

  return null;
};
