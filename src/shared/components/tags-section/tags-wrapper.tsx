'use client';

import { cn } from '@/shared/utils/cn';

import { useTagsSectionContext } from './context';

interface Props {
  children: React.ReactNode;
}

export const TagsWrapper = ({ children }: Props) => {
  const { isLoading } = useTagsSectionContext();

  return (
    <div
      className={cn('flex flex-wrap gap-2', {
        'opacity-60 pointer-events-none': isLoading,
      })}
    >
      {children}
    </div>
  );
};
