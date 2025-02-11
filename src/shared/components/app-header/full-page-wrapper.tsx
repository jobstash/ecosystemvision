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
        '',
        isActiveSearch
          ? 'bg-size-gradient animate-gradient-loop bg-gradient-to-l from-yellow-500 via-blue-500 to-green-500'
          : ' z-50 bg-gradient-to-r from-blue-500 to-purple-600',
      )}
    >
      {/* <p className="py-2 text-center text-white">
        isActiveSearch: {isActiveSearch ? 'True' : 'False'}
      </p> */}
      {children}
    </div>
  );
};
