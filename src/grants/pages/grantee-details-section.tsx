import dynamic from 'next/dynamic';

import { cn } from '@/shared/utils/cn';

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

interface Props {
  hasGranteeId?: boolean;
}

export const GranteeDetailsSection = ({ hasGranteeId }: Props) => {
  // TODO: Disable page scroll on mobile/tablet if hasGranteeId

  return (
    <div
      className={cn(
        'space-y-4',
        { 'hidden lg:block': !hasGranteeId },
        {
          'fixed top-0 left-0 z-50 min-w-full bg-[#070708] min-h-screen pt-20 lg:pt-0 lg:relative':
            hasGranteeId,
        },
      )}
    >
      <GranteeCard />
      <ProjectSelections />
      <ProjectTabSelection />
      <GranteeProjectStats />
    </div>
  );
};
