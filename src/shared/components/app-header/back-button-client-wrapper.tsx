'use client';
import { useAppHeaderContext } from './context';

interface Props {
  children: React.ReactNode;
}

export const BackButtonClientWrapper = ({ children }: Props) => {
  const { showInput } = useAppHeaderContext();

  if (!children || showInput) return null;

  return <div className="hidden lg:block">{children}</div>;
};
