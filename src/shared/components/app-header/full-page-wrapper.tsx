'use client';

import { useAtomValue } from 'jotai';

import { cn } from '@/shared/utils/cn';

import { isActiveSearchAtom } from '@/search/core/atoms';

interface Props {
  children: React.ReactNode;
}

export const FullPageWrapper = ({ children }: Props) => {
  const isActiveSearch = useAtomValue(isActiveSearchAtom);
  // const isActiveSearch = true;

  return (
    <div
      className={cn(
        'flex flex-col gap-4 px-4 py-2 lg:py-4',
        isActiveSearch
          ? 'bg-size-gradient animate-gradient-loop bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-gradient'
          : 'bg-red-500',
      )}
    >
      {children}
    </div>
  );
};
