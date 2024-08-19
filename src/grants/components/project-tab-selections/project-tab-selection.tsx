'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@nextui-org/react';

import { useGranteeFetch } from '@/grants/hooks/use-grantee-fetch';

const SHARED_CLASSNAME = 'flex w-full gap-4 p-4';

export const ProjectTabSelection = () => {
  const { grantId, granteeId, projectId, tab } = useParams() as {
    grantId: string;
    granteeId?: string;
    projectId?: string;
    tab?: string;
  };

  const { granteeData, isLoading, errorMessage } = useGranteeFetch(
    grantId,
    granteeId,
  );

  if (isLoading) {
    return <p>{'TODO: Loading UI <ProjectTabSelection />'}</p>;
  }

  // This component is stacked with others. Top most component renders the error.
  if (errorMessage || !granteeData?.data) return null;

  const currentProject = projectId
    ? granteeData.data.projects.find((p) => p.id === projectId)
    : granteeData.data.projects[0];

  if (!currentProject?.tabs?.length) return null;

  const baseHref = `/grants/${grantId}/grantees/${granteeData.data.id}/projects`;

  const activeTab = tab || currentProject.tabs[0].tab;

  return (
    <div className={cn(SHARED_CLASSNAME, 'bg-white/5')}>
      {currentProject.tabs.map(({ label, tab }) => (
        <Link
          key={label}
          href={`${baseHref}/${currentProject.id}/${tab}`}
          scroll={false}
          prefetch={true}
          className={cn('flex grow justify-center rounded-lg px-4 py-4', {
            'bg-white/5': activeTab !== tab,
            'is-active': activeTab === tab,
          })}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
