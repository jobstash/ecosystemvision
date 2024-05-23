'use client';

import dynamic from 'next/dynamic';

import { ROUTE_TABS } from '@/shared/core/constants';
import { FRONTEND_URL } from '@/shared/core/envs';
import { DetailsPanelActionsWrapper } from '@/shared/components/details-panel/actions-wrapper';
import { DetailsPanelCTA } from '@/shared/components/details-panel/cta';

import { useProjectDetails } from '@/projects/hooks/use-project-details';

interface Props {
  params: {
    id: string;
    tab: string;
  };
}

export const ProjectParamsPage = ({ params: { id, tab } }: Props) => {
  const { data } = useProjectDetails(id);

  if (!data) return null;

  if (tab === ROUTE_TABS.SHARED.DETAILS) {
    return <ProjectDetailsCard project={data} />;
  }

  if (tab === ROUTE_TABS.SHARED.ORG) {
    return (
      <OrgDetailsCard
        org={data.organization}
        actions={
          <DetailsPanelActionsWrapper>
            <DetailsPanelCTA
              text="Explore Organization"
              href={`${FRONTEND_URL}/organizations/${data.organization.orgId}/details`}
            />
          </DetailsPanelActionsWrapper>
        }
      />
    );
  }

  return null;
};

const ProjectDetailsCard = dynamic(() =>
  import(
    '@/projects/components/project-details-cards/project-details-card'
  ).then((m) => m.ProjectDetailsCard),
);

const OrgDetailsCard = dynamic(() =>
  import('@/orgs/components/org-details-card').then((m) => m.OrgDetailsCard),
);
