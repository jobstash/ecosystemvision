'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

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
  useEffect(() => {
    const handleResize = () => {
      if (hasGranteeId && window.innerWidth < 1024) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    };

    handleResize(); // Call once on mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('overflow-hidden'); // Clean up on unmount
    };
  }, [hasGranteeId]);
  return (
    <div
      className={cn(
        'space-y-4 overflow-auto',
        { 'hidden lg:block': !hasGranteeId },
        {
          'fixed top-0 left-0 bottom-0 mt-[95px] z-[999] w-screen bg-[#070708] h-[calc(100vh-95px)] lg:pt-0 lg:relative':
            hasGranteeId,
        },
      )}
    >
      <GranteeCard />
      <div className='space-y-4 px-3.5'>
        <ProjectSelections />
        <ProjectTabSelection />
        <GranteeProjectStats />
      </div>
    </div>
  );
};
