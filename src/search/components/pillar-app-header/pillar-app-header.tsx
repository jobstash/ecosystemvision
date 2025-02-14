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
      className="relative  z-[999]"
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
        className="transition-transform"
        style={{
          transform:
            scrollDirection === 'down'
              ? 'translateY(calc(-100% - 4rem))'
              : 'translateY(0)',
        }}
      >
        <div
          className=" z-50 flex h-[122px] w-full flex-wrap items-center gap-8"
          ref={firstPanelRef}
        >
          {appHeader}
        </div>

        {/* Target div for scroll detection */}
        {/* <div
          ref={secondPanelRef}
          className=" top-[122px] z-40 w-full  transition-transform "
        > */}
          {content}
        {/* </div> */}
      </div>
    </div>
  );
};
