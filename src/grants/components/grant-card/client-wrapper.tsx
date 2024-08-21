/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/shared/utils/cn';
import { useDebounceFn } from '@/shared/hooks/use-debounce-fn';

interface Props {
  collapsed: React.ReactNode;
  full: React.ReactNode;
}

export const ClientWrapper = ({ collapsed, full }: Props) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos >= 40 && !isCollapsed) {
      setIsCollapsed(true);
    } else if (currentScrollPos < prevScrollPos && isCollapsed) {
      setIsCollapsed(false);
    }
    setPrevScrollPos(currentScrollPos);
  }, [isCollapsed, prevScrollPos]);

  const debouncedHandleScroll = useDebounceFn(handleScroll, 100);

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  const content = isCollapsed ? collapsed : full;

  return (
    <div
      className={cn(
        'fixed top-[116px] z-20 w-full overflow-hidden bg-[#070708] transition-all duration-700',
        { pinned: isCollapsed },
      )}
    >
      {content}
    </div>
  );
};
