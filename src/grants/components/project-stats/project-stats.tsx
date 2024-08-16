'use client';

// import { useParams } from 'next/navigation';

// import { useGranteeProjectFetch } from '@/grants/hooks/use-grantee-project-fetch';
// import { GranteeStatItem } from '@/grants/components/grant-stat-item';

export const GranteeProjectStats = () => {
  return null;
  // const { grantId, granteeId, projectId, tab } = useParams() as {
  //   grantId: string;
  //   granteeId?: string;
  //   projectId?: string;
  //   tab?: string;
  // };

  // const { granteeData, projectData, isLoading, errorMessage } =
  //   useGranteeProjectFetch({ grantId, granteeId, projectId });

  // if (isLoading) {
  //   return <p>{'TODO: Loading UI <ProjectStats />'}</p>;
  // }

  // // This component is stacked with others. Top most component renders the error.
  // if (errorMessage) return null;
  // if (!granteeData?.data) return null;
  // if (!projectData?.data) return null;

  // // If for some reason the project has no tabs, return null
  // if (projectData.data.tabs.length === 0) return null;

  // // Match the tab to the project tab or default to the first tab
  // const projectTab =
  //   projectData.data.tabs.find((t) => t.tab === tab) ||
  //   projectData.data.tabs[0];

  // return (
  //   <div className="flex flex-wrap gap-6">
  //     {projectTab.stats.map((granteeStat) => (
  //       <GranteeStatItem key={granteeStat.label} granteeStat={granteeStat} />
  //     ))}
  //   </div>
  // );
};
