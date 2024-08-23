/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; 

import { Grant } from '@/grants/core/schemas';
import { GrantBackButton } from '@/grants/components/grant-back-button';

gsap.registerPlugin(ScrollTrigger); 

const GrantCard = dynamic(
  () => import('@/grants/components/grant-card').then((m) => m.GrantCard),
  {
    ssr: true,
    loading: () => <p>TODO: GrantCard Skeleton</p>,
  },
);

interface Props {
  grant: Grant;
  list: React.ReactNode;
  children: React.ReactNode;
}

function throttle(func: (...args: any[]) => void, limit: number) {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export const GrantPageLayout = ({ list, grant, children }: Props) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Ref for the element to add/remove classes

  useEffect(() => {
    const element = pinRef.current;
    const triggerElement = triggerRef.current;
    const contentElement = contentRef.current;

    if (element && contentElement) {
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 140px",
        endTrigger:"html",
        end:"bottom top",
        pin: element,
        markers: true,
        onEnter: () => {
          contentElement.classList.add(
            'hide-scrollbar',
            'h-[calc(100svh-140px)]',
            'overflow-auto',
          );
        },
        onLeaveBack: () => {
          contentElement.classList.remove(
            'hide-scrollbar',
            'h-[calc(100svh-140px)]',
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
  }, []);

  return (
    <div className="flex flex-col gap-6 px-4 pt-[56px] md:pt-20 lg:px-0 lg:pr-8 lg:pt-0">
      <GrantCard
        grant={grant}
        backButton={<GrantBackButton fallbackUrl="/grants" />}
      />

      <div  className="relative z-10 mt-80">
        <div className="flex gap-8">
          <div className="w-full shrink-0 lg:w-4/12">{list}</div>

          <div ref={pinRef} className="flex w-full flex-col gap-4 lg:w-8/12">
            <div ref={contentRef}>
             {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
