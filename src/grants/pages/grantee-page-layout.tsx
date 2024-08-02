import { GranteeCard } from '@/grants/components/grantee-card/grantee-card';
import { ProjectSelectionClientWrapper } from '@/grants/components/grantee-project/project-selection-client-wrapper';
import { ProjectTabSelection } from '@/grants/components/grantee-project/project-tab-selection';

import { fakeGrant } from '../testutils/fake-grant';

interface Props {
  grantId: string;
  granteeId: string;
  children: React.ReactNode;
}

export const GranteePageLayout = ({ grantId, granteeId, children }: Props) => {
  const baseHref = `/grants/${grantId}/grantees/${granteeId}/projects`;

  // TODO: fetch grant
  const grant = fakeGrant;
  const grantee = grant.grantees.find((g) => g.id === granteeId)!;

  // TODO: fetch projects
  const projects = [
    {
      id: '1',
      name: 'Project 1',
      summary: 'todo',
      impactMetrics: 'todo',
      githubMetrics: 'todo',
      codeMetrics: 'todo',
      contactAddress: 'todo',
    },
    {
      id: '2',
      name: 'Project 2',
      summary: 'todo',
      impactMetrics: 'todo',
      githubMetrics: 'todo',
      codeMetrics: 'todo',
      contactAddress: 'todo',
    },
  ];

  return (
    <div className="flex w-max flex-col gap-4 lg:grow">
      <GranteeCard grantee={grantee} />

      <div className="flex w-full gap-4 bg-white/5 p-4">
        {projects.map(({ id, name }) => (
          <ProjectSelectionClientWrapper
            key={id}
            firstId={projects[0].id}
            baseHref={baseHref}
            projectId={id}
          >
            {name}
          </ProjectSelectionClientWrapper>
        ))}
      </div>

      <ProjectTabSelection projects={projects} baseHref={baseHref} />

      {children}
    </div>
  );
};
