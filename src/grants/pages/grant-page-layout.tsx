import dynamic from 'next/dynamic';

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
  return (
    <div className="flex flex-col gap-6 px-8 pt-[116px]">
      <div className="fixed top-0 z-30 flex h-[116px] w-full items-center bg-[#070708] px-8">
        <GrantBackButton fallbackUrl="/grants" />
      </div>

      <GrantCard grant={grant} />

      <div className="relative z-10 pt-[317px]">
        <span>{`Grantee List of ${grant.name}`}</span>

        <div className="flex gap-8">
          <div className="w-full lg:w-4/12">{list}</div>

          <div className="flex flex-col gap-4 lg:grow">
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
