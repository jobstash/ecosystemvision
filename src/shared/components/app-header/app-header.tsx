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

  const [isOutOfView, setIsOutOfView] = useState(false);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (gradientRef.current) {
        const rect = gradientRef.current.getBoundingClientRect();
        setIsOutOfView(rect.bottom <= 0); // Only trigger when fully out of view
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on mount in case it's already out of view

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppHeaderProvider>
      <FullPageWrapper>
        {/* Fixed div that changes position when gradientRef is out of view */}
        <div
          className={`fixed z-[999] bg-yellow-800 transition-all duration-300 ${
            isOutOfView ? 'top-0' : '-top-full'
          }`}
        >
          header-collapsed
        </div>

        {/* Sticky header */}
        <div className="sticky top-0 z-50 flex min-h-16 w-full flex-wrap items-center gap-8 bg-cyan-600">
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
        <div ref={gradientRef} className="bg-gradient-to-r from-slate-700 to-slate-900">
          {mainPillar}
        </div>
      </FullPageWrapper>
    </AppHeaderProvider>
  );
};
