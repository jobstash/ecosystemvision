import dynamic from 'next/dynamic';

const GranteeCard = dynamic(
  () => import('@/grants/components/grantee-card').then((m) => m.GranteeCard),
  {
    ssr: true,
  },
);

const ProjectSelections = dynamic(
  () =>
    import('@/grants/components/project-selections').then(
      (m) => m.ProjectSelections,
    ),
  {
    ssr: true,
  },
);

const ProjectTabSelection = dynamic(
  () =>
    import('@/grants/components/project-tab-selections').then(
      (m) => m.ProjectTabSelection,
    ),
  {
    ssr: true,
  },
);

const GranteeProjectStats = dynamic(
  () =>
    import('@/grants/components/project-stats').then(
      (m) => m.GranteeProjectStats,
    ),
  {
    ssr: true,
  },
);

export const GranteeDetailsSection = () => {
  return (
    <div className="space-y-4">
      <GranteeCard />
      <ProjectSelections />
      <ProjectTabSelection />
      <GranteeProjectStats />
    </div>
  );
};
