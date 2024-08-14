'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@nextui-org/react';

import { useGranteeFetch } from '@/grants/hooks/use-grantee-fetch';
import { useGranteeProject } from '@/grants/hooks/use-grantee-project';

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

  const defaultProjectId = granteeData?.data.projects[0];
  const { data: projectData, isLoading: isLoadingProject } = useGranteeProject(
    projectId || defaultProjectId,
  );

  if (isLoading || isLoadingProject) {
    return <p>{'TODO: Loading UI <ProjectTabSelection />'}</p>;
  }

  if (errorMessage) {
    return <p>Error: {errorMessage}</p>;
  }

  if (!granteeData?.data) {
    return <p>TODO: No Grantee UI</p>;
  }

  if (!projectData?.data) {
    return <p>TODO: No Grantee Project UI</p>;
  }

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
            'bg-primary': activeTab === tab,
          })}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
