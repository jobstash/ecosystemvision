import { OrgDetails } from '@/orgs/core/schemas';
import { ProjectDetailsCards } from '@/projects/components/project-details-cards';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsProjects = ({ org }: Props) => {
  const { projects } = org;
  return <ProjectDetailsCards projects={projects} />;
};
