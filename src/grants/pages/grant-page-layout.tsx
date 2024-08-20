"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { Grant } from '@/grants/core/schemas';
import { GrantBackButton } from '@/grants/components/grant-back-button';

const GrantCard = dynamic(
  () => import('@/grants/components/grant-card').then((m) => m.GrantCard),
  {
    ssr: true,
    loading: () => <p>TODO: GrantCard Skeleton</p>,
  },
);

// const GranteeCard = dynamic(
//   () => import('@/grants/components/grantee-card').then((m) => m.GranteeCard),
//   {
//     ssr: true,
//     loading: () => <p>TODO: GranteeCard Skeleton</p>,
//   },
// );

// const ProjectSelections = dynamic(
//   () =>
//     import('@/grants/components/project-selections').then(
//       (m) => m.ProjectSelections,
//     ),
//   {
//     ssr: true,
//     loading: () => <p>TODO: ProjectSelections Skeleton</p>,
//   },
// );

// const ProjectTabSelection = dynamic(
//   () =>
//     import('@/grants/components/project-tab-selections').then(
//       (m) => m.ProjectTabSelection,
//     ),
//   {
//     ssr: true,
//     loading: () => <p>TODO: ProjectTabSelection Skeleton</p>,
//   },
// );

interface Props {
  grant: Grant;
  list: React.ReactNode;
  children: React.ReactNode;
}

export const GrantPageLayout = ({ list, grant, children }: Props) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const fixToTop = document.getElementById('fixToTop');
      const secondPin = document.getElementById('secondPin');
      const currentScrollPos = window.scrollY;

      if (currentScrollPos >= 40) {
        fixToTop?.classList.add('pinned');
      } else if (currentScrollPos < prevScrollPos) {
        fixToTop?.classList.remove('pinned');
      }
      setPrevScrollPos(currentScrollPos);

      if (secondPin) {
        if (window.scrollY >= 220) {
          secondPin.classList.add('second-pinned');
        } else {
          secondPin.classList.remove('second-pinned');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);


  return (
    <div className="flex flex-col gap-6 px-8 pt-[116px]">
        <div className='fixed top-0 z-30 flex h-[116px] w-full items-center bg-[#070708] px-8'>
        <GrantBackButton fallbackUrl="/grants" />
        </div>
        <div className="fixed top-[116px] z-20 w-full overflow-hidden bg-[#070708] transition-all duration-700" id='fixToTop'>
          <GrantCard grant={grant} />
          <div className='py-4'>{`Grantee List of ${grant.name}`}</div>
        </div>
      <div className='relative top-0 z-10'>
        <div className="flew-wrap flex gap-8 pt-[350px]">
          <div className="relative z-20 w-[500px]" id="firstPanel">{list}</div>

          <div className="hide-scrollbar absolute left-0 z-10  ml-[540px] flex h-[calc(100vh-260px)] grow flex-col gap-4 overflow-y-auto pb-24" id="secondPin">
            {/* <GranteeCard />/ */}
            {/* <ProjectSelections /> */}
            {/* <ProjectTabSelection /> */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
