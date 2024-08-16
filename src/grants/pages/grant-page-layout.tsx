import dynamic from 'next/dynamic';

import { Divider } from '@/shared/components/divider';

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

export const GrantPageLayout = ({
  // list,
  grant,
  children,
}: Props) => {
  return (
    <div className="flex flex-col gap-6 p-8">
      <GrantBackButton fallbackUrl="/grants" />

      <GrantCard grant={grant} />

      <span>{`Grantee List of ${grant.name}`}</span>

      <Divider />

      <div className="flex gap-8">
        {/* <div className="w-full shrink-0 lg:w-4/12">{list}</div> */}

        <div className="flex w-max flex-col gap-4 lg:grow">
          {/* <GranteeCard />/ */}
          {/* <ProjectSelections /> */}
          {/* <ProjectTabSelection /> */}
          {children}
        </div>
      </div>
    </div>
  );
};
