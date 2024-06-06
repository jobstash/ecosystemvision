import { HREFS, ROUTE_TABS } from '@/shared/core/constants';
import { DetailsPanelTabs } from '@/shared/components/details-panel/tabs';

interface Props {
  slug: string;
}

export const ProjectTabs = ({ slug }: Props) => {
  const prefix = `${HREFS.PROJECTS_PAGE}/${slug}`;
  const tabs = projectTabs.map((tab) => ({
    ...tab,
    href: `${prefix}${tab.href}`,
  }));

  return <DetailsPanelTabs tabs={tabs} />;
};

const projectTabs = [
  { text: `Project Details`, href: `/${ROUTE_TABS.SHARED.DETAILS}` },
  { text: `Organization`, href: `/${ROUTE_TABS.SHARED.ORG}` },
];
