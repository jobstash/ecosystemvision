'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { sendGAEvent } from '@next/third-parties/google';
import { cn } from '@nextui-org/react';

import { GA_EVENT, ROUTE_SECTIONS } from '@/shared/core/constants';

import { useGranteeFetch } from '@/grants/hooks/use-grantee-fetch';
import { TabSelectionsSkeleton } from '@/grants/components/tab-selections-skeleton';

const SHARED_CLASSNAME =
  'flex bg-white/5 hide-scrollbar gap-4 p-3 rounded-20 mr-3.5 lg:mr-0 lg:w-full';

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
      <TabSelectionsSkeleton
        wrapperClassName={cn(SHARED_CLASSNAME, 'w-full')}
        length={5}
      />
    );
  }

  // This component is stacked with others. Top most component renders the error.
  if (errorMessage || !granteeData?.data) return null;

  const currentProject = projectId
    ? granteeData.data.projects.find((p) => p.id === projectId)
    : granteeData.data.projects[0];

  if (!currentProject?.tabs?.length) return null;

  const baseHref = `/${ROUTE_SECTIONS.GRANT_IMPACT}/${grantId}/grantees/${granteeData.data.slug}/projects`;

  const activeTab = tab || currentProject.tabs[0].tab;

  const sendAnalytics = () => {
    sendGAEvent('event', GA_EVENT.GRANTS.GRANTEE_PROJECT_TAB_SELECTION, {
      value: `${currentProject.name}-${activeTab}`,
    });
  };

  return (
    <div className="-mr-3.5 overflow-auto lg:mr-0">
      <div className={cn(SHARED_CLASSNAME, 'w-fit')}>
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
            onClick={sendAnalytics}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};
