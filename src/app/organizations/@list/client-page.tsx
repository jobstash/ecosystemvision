'use client';

import dynamic from 'next/dynamic';

import { ROUTE_SECTIONS } from '@/shared/core/constants';

import { orgFiltersSearchParamsAtom } from '@/filters/core/atoms';
import { orgTotalCountAtom } from '@/orgs/core/atoms';
import { FiltersProvider } from '@/filters/providers/filters-provider';

const FiltersSection = dynamic(
  () =>
    import('@/filters/components/filters-section').then(
      (m) => m.FiltersSection,
    ),
  {
    // Prevent layout shift while fetching bundle (or maybe add skeleton)
    loading: () => <div className="h-24" />,
  },
);

const OrgList = dynamic(() =>
  import('@/orgs/components/org-list').then((m) => m.OrgList),
);

interface Props {
  rawSearchParams: Record<string, string>;
}

export const OrgListClientPage = ({ rawSearchParams }: Props) => {
  return (
    <FiltersProvider
      rawSearchParams={rawSearchParams}
      routeSection={ROUTE_SECTIONS.ORGS}
      atom={orgFiltersSearchParamsAtom}
    >
      <FiltersSection
        countAtom={orgTotalCountAtom}
        searchPlaceholder="Search organizations ..."
      />
      <OrgList />
    </FiltersProvider>
  );
};
