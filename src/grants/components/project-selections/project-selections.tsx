'use client';

import { useParams } from 'next/navigation';

import { useGranteeFetch } from '@/grants/hooks/use-grantee-fetch';
import { ProjectSelectionItemSkeleton } from '@/grants/components/project-selections/project-selection-item-skeleton';

import { ProjectSelection } from './project-selection';

const WRAPPER_CLASSNAME = 'flex w-full gap-3 rounded-20 bg-white/5 p-3';

export const ProjectSelections = () => {
  const { grantId, granteeId, projectId } = useParams() as {
    grantId: string;
    granteeId?: string;
    projectId?: string;
  };

  const { granteeData, isLoading, errorMessage } = useGranteeFetch(
    grantId,
    granteeId,
  );

  if (granteeData?.data.projects.length === 0) return null;

  if (isLoading) {
    return (
      <div className={WRAPPER_CLASSNAME}>
        <ProjectSelectionItemSkeleton />
        <ProjectSelectionItemSkeleton />
      </div>
    );
  }

  // This component is stacked with others. Top most component renders the error.
  if (errorMessage) return null;
  if (!granteeData?.data) return null;

  const baseHref = `/grants/${grantId}/grantees/${granteeData.data.id}/projects`;

  return (
    <div className={WRAPPER_CLASSNAME}>
      {granteeData.data.projects.map(({ id, name }, index) => (
        <ProjectSelection
          key={id}
          projectId={id}
          name={name}
          href={`${baseHref}/${id}`}
          isActiveBypass={!projectId && index === 0}
        />
      ))}
    </div>
  );
};
