'use client';

import { useAtomValue } from 'jotai';

import { isActiveAllFiltersAtom } from '@/search/core/atoms';
import { PillarAllFilters } from '@/search/components/pillar-all-filters/pillar-all-filters';

interface Props {
  children: React.ReactNode;
}

export const PillarAllFiltersWrapper = ({ children }: Props) => {
  const isActive = useAtomValue(isActiveAllFiltersAtom);

  if (isActive) return <PillarAllFilters />;

  return <>{children}</>;
};
