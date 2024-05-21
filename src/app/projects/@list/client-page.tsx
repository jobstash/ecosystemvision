'use client';

import dynamic from 'next/dynamic';

import { ROUTE_SECTIONS } from '@/shared/core/constants';

import {
  projectFiltersSearchParamsAtom,
  projectTotalCountAtom,
} from '@/projects/core/atoms';
import { FiltersProvider } from '@/filters/providers/filters-provider';

const FiltersSection = dynamic(() =>
  import('@/filters/components/filters-section').then((m) => m.FiltersSection),
);

const ProjectList = dynamic(() =>
  import('@/projects/components/project-list').then((m) => m.ProjectList),
);

interface Props {
  rawSearchParams: Record<string, string>;
}

export const ProjectListClientPage = ({ rawSearchParams }: Props) => {
  return (
    <FiltersProvider
      rawSearchParams={rawSearchParams}
      routeSection={ROUTE_SECTIONS.PROJECTS}
      atom={projectFiltersSearchParamsAtom}
    >
      <FiltersSection
        countAtom={projectTotalCountAtom}
        searchPlaceholder="Search projects ..."
      />

      <ProjectList />
    </FiltersProvider>
  );
};
