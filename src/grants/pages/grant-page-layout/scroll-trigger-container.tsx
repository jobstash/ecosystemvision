'use client';

import React, { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useIsDesktop } from '@/shared/hooks/use-media-query';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
}

export const ScrollTriggerContainer = ({ children }: Props) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Ref for the element to add/remove classes

  const isDesktop = useIsDesktop();

  useEffect(() => {
    const element = pinRef.current;
    const contentElement = contentRef.current;

    if (element && contentElement) {
      const scrollTriggerInstance = ScrollTrigger.create({
        start: 'top 230px',
        endTrigger: 'html',
        end: 'bottom top',
        pin: element,
        onEnter: () => {
          contentElement.classList.add(
            'hide-scrollbar',
            'h-[calc(100svh-220px)]',
            'overflow-auto',
          );
        },
        onLeaveBack: () => {
          contentElement.classList.remove(
            'hide-scrollbar',
            'h-[calc(100svh-220px)]',
            'overflow-auto',
          );
        },
      });

      // Throttled version of ScrollTrigger.refresh()
      const throttledRefresh = throttle(() => ScrollTrigger.refresh(), 200);

      // Set up a MutationObserver to watch for changes in the DOM
      const observer = new MutationObserver(() => {
        throttledRefresh(); // Throttled refresh when content changes
      });

      // Observe changes in the document body or a specific container if necessary
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });

      return () => {
        scrollTriggerInstance.kill();
        observer.disconnect(); // Clean up the observer
      };
    }
  }, [isDesktop]);

  return (
    <div ref={pinRef} className="flex w-full flex-col gap-4">
      <div ref={isDesktop ? contentRef : undefined}>{children}</div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
