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
  const fixedDivRef = useRef<HTMLDivElement>(null);
  const [paddingBottom, setPaddingBottom] = useState<number>(0);

  useEffect(() => {
    const currentRef = sentinelRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCollapsed(!entry.isIntersecting);
      },
      {
        rootMargin: '30px 0px 0px 0px',
        threshold: 0,
      },
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    // Debounce function to delay the resize handling
    let resizeTimeout: NodeJS.Timeout;

    const updatePaddingBottom = () => {
      if (fixedDivRef.current) {
        const height = fixedDivRef.current?.offsetHeight || 0;
        setPaddingBottom(height);
        fixedDivRef.current.classList.add(
          'fixed',
          'inset-x-0',
          'top-0',
          'z-50',
          'lg:ml-[236px]',
        );
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout); // Clear the previous timeout
      resizeTimeout = setTimeout(() => {
        updatePaddingBottom();
      }, 20); // Adjust the debounce delay as needed (200ms in this case)
    };

    // Initial calculation
    setTimeout(updatePaddingBottom, 20);

    // Attach the debounced resize event listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout); // Clean up the timeout on unmount
    };
  }, []);

  const content = isCollapsed ? collapsed : full;

  return (
    <div style={{ paddingBottom: `${paddingBottom}px` }}>
      <div ref={sentinelRef} className="absolute left-0 top-0 h-1 w-full"></div>
      <div
        ref={fixedDivRef}
        className="mt-[56px] bg-app-bg md:mt-20  lg:mr-8 lg:mt-0 lg:rounded-b-20"
      >
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
