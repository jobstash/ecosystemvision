import { ProjectDetails } from '@/projects/core/schemas';
import { OrgDetailsCard } from '@/orgs/components/org-details-card';

interface Props {
  project: ProjectDetails;
}

export const ProjectDetailsOrg = ({ project }: Props) => {
  const { organizations: orgs } = project;

  return (
    <div className="flex flex-col gap-4">
      {orgs.map((org) => (
        <OrgDetailsCard key={org.id} org={org} />
      ))}
    </div>
  );
};
