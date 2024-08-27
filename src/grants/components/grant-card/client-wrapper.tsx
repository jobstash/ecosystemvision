/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/shared/utils/cn';
import { useDebounceFn } from '@/shared/hooks/use-debounce-fn';

interface Props {
  backButton: React.ReactNode;
  collapsed: React.ReactNode;
  full: React.ReactNode;
}

export const ClientWrapper = ({ backButton, collapsed, full }: Props) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos >= 50) {
      setIsCollapsed(true);
    } else if (currentScrollPos < prevScrollPos) {
      setIsCollapsed(false);
    }
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  const debouncedHandleScroll = useDebounceFn(handleScroll, 200);

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  const content = isCollapsed ? collapsed : full;

  return (
    <div className="fixed inset-x-0 top-0 z-50 mt-[56px] bg-app-bg md:mt-20 lg:ml-[264px] lg:mr-8 lg:mt-0 lg:rounded-b-20">
      <div className="flex items-center px-5 lg:h-[115px]">{backButton}</div>
      <div
        className={cn('w-screen transition-all duration-700 lg:w-full', {
          pinned: isCollapsed,
        })}
      >
        {content}
      </div>
    </div>
  );
};
