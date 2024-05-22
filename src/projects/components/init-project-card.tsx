'use client';

import { usePathname } from 'next/navigation';

import { useAtomValue } from 'jotai';

import { HREFS } from '@/shared/core/constants';
import { CardSkeleton } from '@/shared/components/card-skeleton';

import { initProjectAtom } from '@/projects/core/atoms';
import { initPathAtom } from '@/shared/core/atoms';

import { ProjectCard } from './project-card';

interface Props {
  filterParamsString: string;
}

export const InitProjectCard = ({ filterParamsString }: Props) => {
  const pathname = usePathname();

  const initPath = useAtomValue(initPathAtom);
  const initProject = useAtomValue(initProjectAtom);

  // Do not render if initailly on list page
  if (initPath === HREFS.PROJECTS_PAGE) return null;

  // Do not render if on listpage and no initProject (mobile)
  if (!initProject && pathname === HREFS.PROJECTS_PAGE) return null;

  // Render init-project if set
  if (initProject) {
    return (
      <ProjectCard
        isInit
        project={initProject}
        filterParamsString={filterParamsString}
      />
    );
  }

  // Defaults to a skeleton
  return <CardSkeleton />;
};
