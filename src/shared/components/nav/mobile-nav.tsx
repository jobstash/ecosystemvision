'use client';

import { useAtomValue } from 'jotai';

import { showFullscreenNavAtom } from '@/shared/core/atoms';

import { FullscreenWrapper } from './fullscreen-wrapper';
import { NavSections } from './sections';

export const MobileNav = () => {
  const isDisplayed = useAtomValue(showFullscreenNavAtom);

  if (!isDisplayed) return null;

  return (
    <>
      {/* Mobile Fullscreen Nav */}
      <FullscreenWrapper>
        <div className="fixed left-0 top-0 z-[9999] flex size-full shrink-0 flex-col bg-black bg-gradient-to-l from-base-dark to-tertiary/25 px-4 lg:hidden">
          <NavSections isMobile />
        </div>
      </FullscreenWrapper>
    </>
  );
};
