import { Grantee } from '@/grants/core/schemas';
import { GranteeCard } from '@/grants/components/grantee-card/grantee-card';
import { ProjectSelections } from '@/grants/components/grantee-project/project-selections';
import { ProjectTabSelection } from '@/grants/components/grantee-project/project-tab-selection';

interface Props {
  baseHref: string;
  grantee: Grantee;
  // TODO: Project
  children: React.ReactNode;
}

export const GranteePageLayout = ({ baseHref, grantee, children }: Props) => {
  const projects = grantee.projects;

  // TODO: move this to GrantPageLayout and delete this

  return (
    <div className="flex w-max flex-col gap-4 lg:grow">
      <GranteeCard />

      <ProjectSelections baseHref={baseHref} projects={projects} />

      <ProjectTabSelection defaultId={projects[0]} baseHref={baseHref} />

      {children}
    </div>
  );
};
