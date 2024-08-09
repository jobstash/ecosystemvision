import { ProjectSelection } from './project-selection';

interface SelectionsProps {
  baseHref: string;
  projects: string[];
}

export const ProjectSelections = ({ baseHref, projects }: SelectionsProps) => {
  if (projects.length === 0) return null;

  return (
    <div className="flex w-full gap-4 bg-white/5 p-4">
      {projects.map((projectId) => (
        <ProjectSelection
          key={projectId}
          firstId={projects[0]}
          projectId={projectId}
          baseHref={baseHref}
        />
      ))}
    </div>
  );
};
