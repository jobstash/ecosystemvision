import { FullscreenWrapper } from '@/shared/components/nav/fullscreen-wrapper';

import { NavSections } from './sections';

export const Nav = () => {
  return (
    <>
      {/* Mobile Fullscreen Nav */}
      <FullscreenWrapper>
        <div className="fixed left-0 top-0 z-[9999] flex size-full shrink-0 flex-col bg-black bg-gradient-to-l from-base-dark to-tertiary/25 px-5 py-2 lg:hidden">
          <NavSections isMobile />
        </div>
      </FullscreenWrapper>

      <NavSections />
    </>
  );
};
