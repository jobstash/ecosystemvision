'use client';

import { HREFS, ROUTE_TABS } from '@/shared/core/constants';
import { DetailsPanelTabs } from '@/shared/components/details-panel/tabs';

import { useProjectDetails } from '@/projects/hooks/use-project-details';

const projectTabs = [
  { text: `Project Details`, href: `/${ROUTE_TABS.SHARED.DETAILS}` },
  { text: `Organization`, href: `/${ROUTE_TABS.SHARED.ORG}` },
];

interface Props {
  slug: string;
}

export const ProjectTabs = ({ slug }: Props) => {
  const { data } = useProjectDetails(slug);

  if (!data) return null;
  if (!data.organization) return null;

  const prefix = `${HREFS.PROJECTS_PAGE}/${slug}`;
  const tabs = projectTabs.map((tab) => ({
    ...tab,
    href: `${prefix}${tab.href}`,
  }));

  return <DetailsPanelTabs tabs={tabs} />;
};
