'use client';

import { useAtomValue } from 'jotai';

import { isActiveAllFiltersAtom } from '@/search/core/atoms';

interface Props {
  allFilters: React.ReactNode;
  children: React.ReactNode;
}

export const PillarAllFiltersWrapper = ({ allFilters, children }: Props) => {
  const isActive = useAtomValue(isActiveAllFiltersAtom);

  if (isActive) return allFilters;

  return <>{children}</>;
};
