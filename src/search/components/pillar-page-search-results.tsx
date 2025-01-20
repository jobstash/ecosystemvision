'use client';

import { useAtomValue } from 'jotai';

import { PillarNav } from '@/search/core/types';
import { isFocusedPillarSearchInputAtom } from '@/search/core/atoms';
import { SearchResults } from '@/search/components/search-results';

interface Props {
  nav: PillarNav;
  excluded: string;
}

export const PillarPageSearchResults = ({ nav, excluded }: Props) => {
  const isVisible = useAtomValue(isFocusedPillarSearchInputAtom);

  if (!isVisible) return null;

  return <SearchResults isPillarSearchResult nav={nav} excluded={excluded} />;
};
