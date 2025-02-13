'use client';

import { usePillarAppHeader } from './use-pillar-app-header';

interface Props {
  appHeader: React.ReactNode;
  content: React.ReactNode;
}

export const PillarAppHeader = (props: Props) => {
  const { appHeader, content } = props;

  const {
    parentHeight,
    isCollapsed,
    scrollDirection,
    firstPanelRef,
    secondPanelRef,
  } = usePillarAppHeader();

  return (
    <div
      className="relative"
      style={{ height: `${parentHeight}px` }} // Set the height dynamically
    >
      {/* Fixed div that changes position when gradientRef is out of view */}
      <div
        className={`fixed z-[999] h-[105px] w-full bg-yellow-800 transition-all duration-300 ${
          isCollapsed ? 'top-0' : '-top-full'
        }`}
      >
        header-collapsed
      </div>

      {/* Sticky header */}
      <div
        className="fixed z-50 flex h-16 w-full flex-wrap items-center gap-8 bg-cyan-600 transition-transform"
        ref={firstPanelRef}
        style={{
          transform:
            scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        {appHeader}
      </div>

      {/* Target div for scroll detection */}
      <div
        ref={secondPanelRef}
        className="fixed top-16 z-40 w-full bg-gradient-to-r from-slate-700 to-slate-900 p-4 transition-transform lg:max-w-[calc(100%-236px)]"
        style={{
          transform:
            scrollDirection === 'down'
              ? 'translateY(calc(-100% - 4rem))'
              : 'translateY(0)',
        }}
      >
        {content}
      </div>
    </div>
  );
};
