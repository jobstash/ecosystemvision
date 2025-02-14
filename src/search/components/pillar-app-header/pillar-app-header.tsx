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
        TODO: HERE WE CAN INCLUDE AN COLLAPSIBLE HEADER COMPONENT
      </div>

      {/* Sticky header */}
      <div className="">
        <div
          className="fixed transition-transform duration-700 z-50 flex h-[122px] w-full flex-wrap items-center gap-8"
          ref={firstPanelRef}
          style={{
            transform:
              scrollDirection === 'down'
                ? 'translateY(calc(-100% - 4rem))'
                : 'translateY(0)',
          }}
        >
          {appHeader}
        </div>

        {/* Target div for scroll detection */}
        <div
          ref={secondPanelRef}
          className=" top-[122px] fixed z-40 w-full duration-700 lg:w-[calc(100vw-236px)]  transition-transform  bg-[#070708]"
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
    </div>
  );
};
