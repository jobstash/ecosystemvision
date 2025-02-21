'use client';

import { useParams } from 'next/navigation';

import { ROUTE_SECTIONS } from '@/shared/core/constants';

import { useGranteeFetch } from '@/grants/hooks/use-grantee-fetch';
import { TabSelectionsSkeleton } from '@/grants/components/tab-selections-skeleton';

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

  if (granteeData?.projects.length === 0) return null;

  if (isLoading) {
    return (
      <TabSelectionsSkeleton wrapperClassName={WRAPPER_CLASSNAME} length={2} />
    );
  }

  // This component is stacked with others. Top most component renders the error.
  if (errorMessage || !granteeData) return null;

  const baseHref = `/${ROUTE_SECTIONS.IMPACT}/${grantId}/grantees/${granteeData.slug}/projects`;

  return (
    <div className={WRAPPER_CLASSNAME}>
      {granteeData.projects.map(({ id, name }, index) => (
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
