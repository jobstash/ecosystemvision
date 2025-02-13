'use client';

import { useAppHeaderContext } from './context';

interface Props {
  children: React.ReactNode;
}

export const InputClientWrapper = ({ children }: Props) => {
  const { showInput } = useAppHeaderContext();

  if (!showInput) return null;

  return children;
};
