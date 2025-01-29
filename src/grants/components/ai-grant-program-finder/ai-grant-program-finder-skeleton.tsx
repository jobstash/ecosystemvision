'use client';

import { usePathname } from 'next/navigation';

import { Skeleton } from '@heroui/skeleton';

import { cn } from '@/shared/utils/cn';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';

interface Props {
  isDesktop?: boolean;
}

export const AiGrantProgramFinderSkeleton = ({ isDesktop }: Props) => {
  const isMounted = useIsMounted();

  const pathname = usePathname();

  return isMounted || pathname !== '/active-grants' ? null : (
    <div
      className={cn('h-full', {
        'lg:hidden': !isDesktop,
        'hidden lg:block': isDesktop,
      })}
    >
      <div className="mt-5 flex h-full flex-col gap-4 rounded-20 border border-white/10 p-4 md:mt-6 lg:mt-0">
        <h2 className="text-xl font-semibold">AI Grant Program Finder</h2>
        <span className="text-sm">
          Our AI assistant will help you identify which grant program suits your
          application best
        </span>
        <Skeleton className="min-h-[88px] grow rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
};
