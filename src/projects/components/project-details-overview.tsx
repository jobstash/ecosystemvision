import { ProjectDetails } from '@/projects/core/schemas';

interface Props {
  project: ProjectDetails;
}

export const ProjectDetailsOverview = ({ project }: Props) => {
  return <pre>{JSON.stringify({ overview: project }, undefined, '\t')}</pre>;
};
