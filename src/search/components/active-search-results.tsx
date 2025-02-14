'use client';

import { useAtomValue } from 'jotai';

import { isActiveSearchAtom } from '@/search/core/atoms';

import { SearchResults } from './search-results';

interface Props {
  nav?: string;
}

export const ActiveSearchResults = ({ nav }: Props) => {
  const isVisible = useAtomValue(isActiveSearchAtom);

  if (!isVisible) return null;

  return <SearchResults nav={nav} />;
};
