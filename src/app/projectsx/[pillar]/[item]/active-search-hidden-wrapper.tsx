'use client';

import { useAtomValue } from 'jotai';

import { isActiveSearchAtom } from './atoms';

interface Props {
  children: React.ReactNode;
}

export const ActiveSearchHiddenWrapper = ({ children }: Props) => {
  const isActiveSearch = useAtomValue(isActiveSearchAtom);

  if (isActiveSearch) return null;

  return <>{children}</>;
};
