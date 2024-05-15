'use client';

import { useAtomValue } from 'jotai';

import { showFullscreenNavAtom } from '@/shared/core/atoms';

interface Props {
  children: React.ReactNode;
}

export const FullscreenWrapper = ({ children }: Props) => {
  const isDisplayed = useAtomValue(showFullscreenNavAtom);
  return isDisplayed ? children : null;
};
