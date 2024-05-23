import { FRONTEND_URL } from '@/shared/core/envs';
import { ProjectAllInfo } from '@/shared/core/schemas';
import { DetailsPanelActionsWrapper } from '@/shared/components/details-panel/actions-wrapper';
import { DetailsPanelCTA } from '@/shared/components/details-panel/cta';

import { ProjectDetailsCard } from './project-details-card';

const CTA_TEXT = 'Explore Project';

interface Props {
  projects: ProjectAllInfo[];
}

export const ProjectDetailsCards = ({ projects }: Props) => {
  if (!projects.length) return null;

  return (
    <div className="flex flex-col gap-6">
      {projects.map((project) => (
        <ProjectDetailsCard
          key={project.id}
          project={project}
          actions={
            <DetailsPanelActionsWrapper>
              <DetailsPanelCTA
                text={CTA_TEXT}
                href={`${FRONTEND_URL}/projects/${project.id}/details`}
              />
            </DetailsPanelActionsWrapper>
          }
        />
      ))}
    </div>
  );
};
