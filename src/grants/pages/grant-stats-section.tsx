import dynamic from 'next/dynamic';

const GranteeProjectStats = dynamic(
  () =>
    import('@/grants/components/project-stats/project-stats').then(
      (m) => m.GranteeProjectStats,
    ),
  { ssr: true, loading: () => <p>TODO: Grante Stats Skeleton</p> },
);

export const GrantsStatsSection = () => {
  return <GranteeProjectStats />;
};
