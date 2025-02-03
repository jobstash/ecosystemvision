import { OrgDetails } from '@/orgs/core/schemas';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsProjects = ({ org }: Props) => {
  const { projects } = org;
  return (
    <div>
      {projects.map((project) => (
        <pre key={project.id}>{JSON.stringify(project, undefined, '\t')}</pre>
      ))}
    </div>
  );
};
