'use client';

import { useAtomValue } from 'jotai';

import { cn } from '@/shared/utils/cn';

import { isActiveSearchAtom } from '@/search/core/atoms';

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

  const isActiveSearch = useAtomValue(isActiveSearchAtom);

  return (
    <div
      className="relative z-[999]"
      style={{ height: `${parentHeight}px` }} // Set the height dynamically
    >
      {/* Fixed div that changes position when gradientRef is out of view */}
      <div
        className={cn(
          'fixed z-[999]  w-full bg-yellow-800 transition-all duration-300',
          { 'top-0': isCollapsed },
          { '-top-full': !isCollapsed && !isActiveSearch },
        )}
      >
        {appHeader}
      </div>

      {/* Sticky header */}
      <div>
        <div
          className="fixed z-50 flex h-[122px] w-full flex-wrap items-center gap-8 transition-transform duration-700"
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
          className="fixed top-[122px] z-40 w-full bg-[#070708] transition-transform  duration-700  lg:w-[calc(100vw-236px)]"
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
