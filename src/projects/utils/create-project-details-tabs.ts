import { ROUTE_SECTIONS } from '@/shared/core/constants';

import { ProjectDetails } from '@/projects/core/schemas';

export const createProjectDetailsTabs = (project: ProjectDetails) => {
  const hrefPrefix = `/${ROUTE_SECTIONS.PROJECTS}/info/${project.normalizedName}`;

  const tabs = [{ key: 'overview', text: 'Overview', href: `${hrefPrefix}` }];

  const orgsCount = project.organizations.length;
  if (orgsCount > 0) {
    const text =
      orgsCount === 1 ? 'Organization' : `Organizations (${orgsCount})`;
    tabs.push({
      key: 'organizations',
      text,
      href: `${hrefPrefix}/organizations`,
    });
  }

  return tabs;
};
