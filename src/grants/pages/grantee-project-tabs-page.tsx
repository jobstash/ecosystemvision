import { ROUTE_TABS } from '@/shared/core/constants';

import { CodeMetrics } from '@/grants/components/grantee-project/code-metrics';
import { Contact } from '@/grants/components/grantee-project/contact';
import { GithubMetrics } from '@/grants/components/grantee-project/github-metrics';
import { ImpactMetrics } from '@/grants/components/grantee-project/impact-metrics';
import { Summary } from '@/grants/components/grantee-project/summary';

interface Props {
  params: {
    projectId: string;
    tab: string;
  };
}

const tabComponents = {
  [ROUTE_TABS.GRANTS.SUMMARY]: Summary,
  [ROUTE_TABS.GRANTS.IMPACT_METRICS]: ImpactMetrics,
  [ROUTE_TABS.GRANTS.GITHUB_METRICS]: GithubMetrics,
  [ROUTE_TABS.GRANTS.CODE_METRICS]: CodeMetrics,
  [ROUTE_TABS.GRANTS.CONTACT]: Contact,
};

export const GranteeProjectTabsPage = ({
  params: { projectId, tab },
}: Props) => {
  const Component = tabComponents[tab];
  return Component ? <Component projectId={projectId} /> : null;
};
