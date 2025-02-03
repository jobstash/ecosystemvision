import { ProjectDetails } from '@/projects/core/schemas';

interface Props {
  project: ProjectDetails;
}

export const ProjectDetailsOrg = ({ project }: Props) => {
  const { organizations: orgs } = project;

  return (
    <div className="flex flex-col gap-4">
      {orgs.map((org) => (
        <pre key={org.id}>{JSON.stringify({ org }, undefined, '\t')}</pre>
      ))}
    </div>
  );
};
