'use client';

import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  children: React.ReactNode;
  shouldReduceOpacity?: boolean;
  loadingIcon?: React.ReactNode;
  className?: ClassValue;
  isFullWidth?: boolean;
}

export const PillarLoadingWrapper = (props: Props) => {
  const {
    children,
    shouldReduceOpacity = true,
    loadingIcon = null,
    className,
    isFullWidth = false,
  } = props;
  const { isPendingPillarRoute: isLoading } = usePillarRoutesContext();

  return (
    <div
      className={cn(
        { 'w-full': isFullWidth },
        { 'pointer-events-none': isLoading },
        { 'opacity-60': shouldReduceOpacity && isLoading },
        className,
      )}
    >
      {isLoading && loadingIcon ? loadingIcon : children}
    </div>
  );
};
