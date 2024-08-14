'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@nextui-org/react';

import { useGranteeProjectFetch } from '@/grants/hooks/use-grantee-project-fetch';

const SHARED_CLASSNAME = 'flex w-full gap-4 p-4';

export const ProjectTabSelection = () => {
  const { grantId, granteeId, projectId, tab } = useParams() as {
    grantId: string;
    granteeId?: string;
    projectId?: string;
    tab?: string;
  };

  const { granteeData, projectData, isLoading, errorMessage } =
    useGranteeProjectFetch({ grantId, granteeId, projectId });

  if (isLoading) {
    return <p>{'TODO: Loading UI <ProjectTabSelection />'}</p>;
  }

  // This component is stacked with others. Top most component renders the error.
  if (errorMessage) return null;
  if (!granteeData?.data) return null;
  if (!projectData?.data) return null;

  // If for some reason the project has no tabs, return null
  if (projectData.data.tabs.length === 0) return null;

  const activeTab = tab || projectData.data.tabs[0].tab;
  if (!activeTab) return null;

  const baseHref = `/grants/${grantId}/grantees/${granteeData.data.id}/projects`;

  const tabs = projectData.data.tabs.map((t) => ({
    ...t,
    href: `${baseHref}/${projectData.data.id}/${t.tab}`,
  }));

  return (
    <div className={cn(SHARED_CLASSNAME, 'bg-white/5')}>
      {tabs.map(({ label, tab, href }) => (
        <Link
          key={href}
          href={href}
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
