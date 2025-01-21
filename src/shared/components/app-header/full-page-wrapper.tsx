'use client';

import { useAtomValue } from 'jotai';

import { cn } from '@/shared/utils/cn';

import { isActiveSearchAtom } from '@/search/core/atoms';

interface Props {
  children: React.ReactNode;
}

export const FullPageWrapper = ({ children }: Props) => {
  const isActiveSearch = useAtomValue(isActiveSearchAtom);

  return (
    <div
      className={cn('flex flex-col gap-4 bg-neutral-900 px-4 py-2 lg:py-4', {
        'min-h-screen': isActiveSearch,
      })}
    >
      {children}
    </div>
  );
};
