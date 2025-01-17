'use client';

import { useAtomValue } from 'jotai';

import { PillarSearchNavFilter } from '@/search/core/types';
import { isFocusedPillarSearchInputAtom } from '@/search/core/atoms';
import { SearchResults } from '@/search/components/search-results';

interface Props {
  nav: PillarSearchNavFilter;
}

export const PillarPageSearchResults = ({ nav }: Props) => {
  const isVisible = useAtomValue(isFocusedPillarSearchInputAtom);

  if (!isVisible) return null;

  return <SearchResults nav={nav} />;
};
