'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@nextui-org/react';

import { useGranteeFetch } from '@/grants/hooks/use-grantee-fetch';
import { TabSelectionsSkeleton } from '@/grants/components/tab-selections-skeleton';

const SHARED_CLASSNAME =
  'flex w-fit hide-scrollbar gap-4 p-4 rounded-20 mr-3.5';

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
    return (
      <TabSelectionsSkeleton wrapperClassName={SHARED_CLASSNAME} length={5} />
    );
  }

  // This component is stacked with others. Top most component renders the error.
  if (errorMessage || !granteeData?.data) return null;

  const currentProject = projectId
    ? granteeData.data.projects.find((p) => p.id === projectId)
    : granteeData.data.projects[0];

  if (!currentProject?.tabs?.length) return null;

  const baseHref = `/grants/${grantId}/grantees/${granteeData.data.slug}/projects`;

  const activeTab = tab || currentProject.tabs[0].tab;

  return (
    <div className="-mr-3.5 overflow-auto">
      <div className={cn(SHARED_CLASSNAME, 'bg-white/5')}>
        {currentProject.tabs.map(({ label, tab }) => (
          <Link
            key={label}
            href={`${baseHref}/${currentProject.id}/${tab}`}
            scroll={false}
            prefetch={true}
            className={cn(
              'flex grow justify-center whitespace-nowrap rounded-2xl px-4 py-3 font-medium',
              {
                'bg-white/5': activeTab !== tab,
                'is-active': activeTab === tab,
              },
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};
