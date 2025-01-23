'use client';

import { useAtomValue } from 'jotai';

import { isActiveSearchAtom } from './atoms';
import { SearchResults } from './search-results';

interface Props {
  nav: string;
  excluded: string;
}

export const PillarPageSearchResults = ({ nav, excluded }: Props) => {
  const isVisible = useAtomValue(isActiveSearchAtom);

  if (!isVisible) return null;

  return <SearchResults isPillarSearchResult nav={nav} excluded={excluded} />;
};
