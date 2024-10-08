import { Brand } from '@/shared/components/brand';
import { MobileHeader } from '@/shared/components/mobile-header';

import { FullscreenWrapper } from './fullscreen-wrapper';
import { NavSections } from './sections';

export const Nav = () => {
  return (
    <nav>
      {/* Mobile Top Header */}
      <MobileHeader left={<Brand />} />

      {/* Mobile Fullscreen Nav */}
      <FullscreenWrapper>
        <div className="fixed left-0 top-0 z-[9999] flex size-full shrink-0 flex-col bg-black bg-gradient-to-l from-base-dark to-tertiary/25 px-5 py-2 lg:hidden">
          <NavSections isMobile />
        </div>
      </FullscreenWrapper>

      {/* Desktop Sidebar Nav */}
      <div className="fixed left-0 top-0 z-50 hidden h-full w-[264px] shrink-0 flex-col bg-[#070708] p-8 lg:flex">
        <NavSections />
      </div>
    </nav>
  );
};
