import { GranteeCard } from '@/grants/components/grantee-card/grantee-card';
import { ProjectSelections } from '@/grants/components/grantee-project/project-selections';
import { ProjectTabSelection } from '@/grants/components/grantee-project/project-tab-selection';

import { fakeGrantee } from '@/grants/testutils/fake-grantee';

interface Props {
  grantId: string;
  granteeId: string;
  children: React.ReactNode;
}

export const GranteePageLayout = ({ grantId, granteeId, children }: Props) => {
  const baseHref = `/grants/${grantId}/grantees/${granteeId}/projects`;

  // TODO: fetch grantee
  const grantee = fakeGrantee();
  const projects = grantee.projects;
  const hasProject = projects.length > 0;

  return (
    <div className="flex w-max flex-col gap-4 lg:grow">
      <GranteeCard grantee={grantee} />

      <ProjectSelections baseHref={baseHref} projects={projects} />

      {hasProject && (
        <ProjectTabSelection defaultId={projects[0]} baseHref={baseHref} />
      )}

      {children}
    </div>
  );
};
