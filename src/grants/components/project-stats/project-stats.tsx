'use client';

import { useParams } from 'next/navigation';

import { useGranteeFetch } from '@/grants/hooks/use-grantee-fetch';
import { GranteeStatItem } from '@/grants/components/grant-stat-item';

export const GranteeProjectStats = () => {
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

  if (isLoading) return <p>{'TODO: Loading UI <ProjectStats />'}</p>;

  // This component is stacked with others. Top most component renders the error.
  if (granteeData?.data?.projects.length === 0) return null;
  if (errorMessage || !granteeData?.data) return null;

  const currentProject = projectId
    ? granteeData.data.projects.find((project) => project.id === projectId)
    : granteeData.data.projects[0];

  if (!currentProject || currentProject.tabs.length === 0) return null;

  const activeTab = tab || currentProject.tabs[0].tab;
  const currentTab = currentProject.tabs.find((t) => t.tab === activeTab);

  if (!currentTab?.stats?.length) return null;

  return (
    <div className="-mx-1.5 flex flex-wrap gap-y-5 pb-5">
      {currentTab.stats.map((granteeStat) => (
        <GranteeStatItem key={granteeStat.label} granteeStat={granteeStat} />
      ))}
    </div>
  );
};
