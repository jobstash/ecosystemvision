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
        <div className="fixed left-0 top-0 z-50 flex size-full shrink-0 flex-col bg-gradient-to-l from-[#0D0D0D] to-primary p-4 py-2 lg:hidden">
          <NavSections isMobile />
        </div>
      </FullscreenWrapper>

      {/* Desktop Sidebar Nav */}
      <div className="fixed left-0 top-0 hidden h-full w-[264px] shrink-0 flex-col p-8 lg:flex">
        <NavSections />
      </div>
    </nav>
  );
};
