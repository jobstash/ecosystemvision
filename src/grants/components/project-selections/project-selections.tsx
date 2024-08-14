'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { errMsg } from '@/shared/core/errors';

import { useGranteeProjectFetch } from '@/grants/hooks/use-grantee-project-fetch';
import { ProjectSelectionItemSkeleton } from '@/grants/components/project-selections/project-selection-item-skeleton';

import { ProjectSelection } from './project-selection';

const WRAPPER_CLASSNAME = 'flex w-full gap-3 rounded-20 bg-white/5 p-3';

export const ProjectSelections = () => {
  const { grantId, granteeId, projectId } = useParams() as {
    grantId: string;
    granteeId?: string;
    projectId?: string;
  };

  const [hasError, setHasError] = useState(false);
  const showError = () => setHasError(true);

  const { granteeData, projectData, isLoading, errorMessage } =
    useGranteeProjectFetch({
      grantId,
      granteeId,
      projectId,
    });

  if (isLoading) {
    return (
      <div className={WRAPPER_CLASSNAME}>
        <ProjectSelectionItemSkeleton />
        <ProjectSelectionItemSkeleton />
      </div>
    );
  }

  if (hasError) {
    return <p>Error: {errMsg.INTERNAL}</p>;
  }

  // This component is stacked with others. Top most component renders the error.
  if (errorMessage) return null;
  if (!granteeData?.data) return null;

  if (!projectData?.data) {
    return <p>TODO: No Grantee Project UI</p>;
  }

  const baseHref = `/grants/${grantId}/grantees/${granteeData.data.id}/projects`;

  return (
    <div className={WRAPPER_CLASSNAME}>
      {granteeData.data.projects.map((id, index) => (
        <ProjectSelection
          key={id}
          projectId={id}
          href={`${baseHref}/${id}`}
          isActiveBypass={!projectId && index === 0}
          showError={showError}
        />
      ))}
    </div>
  );
};
