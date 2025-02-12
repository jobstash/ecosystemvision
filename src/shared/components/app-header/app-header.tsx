'use client';

import React, { useEffect, useRef, useState } from 'react';

import { FullPageWrapper } from '@/shared/components/app-header/full-page-wrapper';
import { SearchDetailsButton } from '@/shared/components/app-header/search-details-button';
import { Brand } from '@/shared/components/brand';
import { MenuButton } from '@/shared/components/menu-button';

import { AppHeaderProvider } from './context';
import { HeaderLinks } from './header-links';
import { MainInput } from './main-input';

interface Props {
  input?: React.ReactNode;
  mainPillar?: React.ReactNode;
  searchResults?: React.ReactNode;
  showSearchButton?: boolean;
}

export const AppHeader = (props: Props) => {
  const { input, mainPillar, searchResults, showSearchButton } = props;

  const [scrollPos, setScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const firstPanelRef = useRef<HTMLDivElement>(null);
  const secondPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Only start checking scroll direction after 60px
      if (currentScroll <= 60) {
        setScrollDirection(null); // No transition if below 60px
        return;
      }

      // Determine Scroll Direction
      if (currentScroll > scrollPos) {
        setScrollDirection('down');
      } else if (currentScroll < scrollPos) {
        setScrollDirection('up');
      }

      setScrollPos(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPos]);

  return (
    <AppHeaderProvider>
      <FullPageWrapper>
        {/* Fixed div that changes position when gradientRef is out of view */}
        {/* <div
          className={`fixed z-[999] bg-yellow-800 transition-all duration-300 ${
            isOutOfView ? 'top-0' : '-top-full'
          }`}
        >
          header-collapsed
        </div> */}

        {/* Sticky header */}
        <div  
          className="first-panel fixed z-50 flex min-h-16 transition-transform w-full flex-wrap items-center gap-8 bg-cyan-600"
          ref={firstPanelRef}
          style={{
            transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)',
          }}
        >
          <div className="order-1 shrink-0 lg:hidden">
            <Brand />
          </div>

          <div className="order-3 w-full grow lg:order-2 lg:w-auto">
            <MainInput mainInput={input} />
          </div>

          <div className="order-2 flex grow justify-end gap-4 lg:grow-0">
            {showSearchButton && <SearchDetailsButton />}
            <HeaderLinks />
            <MenuButton />
          </div>
        </div>

        {searchResults}

        {/* Target div for scroll detection */}
        <div
          ref={secondPanelRef}
          className="second-panel lg:max-w-[calc(100%-236px)] z-40  fixed top-16 w-full transition-transform  bg-gradient-to-r from-slate-700 to-slate-900"
          style={{
            transform: scrollDirection === 'down' ? 'translateY(calc(-100% - 4rem))' : 'translateY(0)',
          }}
        >
          {mainPillar}
        </div>
      </FullPageWrapper>
    </AppHeaderProvider>
  );
};
