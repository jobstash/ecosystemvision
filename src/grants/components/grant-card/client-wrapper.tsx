/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/utils/cn';

interface Props {
  backButton: React.ReactNode;
  collapsed: React.ReactNode;
  full: React.ReactNode;
}

export const ClientWrapper = ({ backButton, collapsed, full }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sentinelRef.current;
    if (!currentRef) return; // Se currentRef è null, esci dalla funzione

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCollapsed(!entry.isIntersecting);
      },
      {
        rootMargin: '50px 0px 0px 0px', // Adjust as needed
        threshold: 0,
      },
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, []);

  const content = isCollapsed ? collapsed : full;

  return (
    <div>
      <div ref={sentinelRef} className="absolute left-0 top-0 h-1 w-full"></div>
      <div className="fixed inset-x-0 top-0 z-50 mt-[56px] bg-app-bg md:mt-20 lg:ml-[264px] lg:mr-8 lg:mt-0 lg:rounded-b-20">
        {/* Sentinel element for IntersectionObserver */}

        <div className="flex items-center px-5 lg:h-[115px] lg:px-0">
          {backButton}
        </div>
        <div
          className={cn('w-screen transition-all duration-700 lg:w-full', {
            pinned: isCollapsed,
          })}
        >
          {content}
        </div>
      </div>
    </div>
  );
};
