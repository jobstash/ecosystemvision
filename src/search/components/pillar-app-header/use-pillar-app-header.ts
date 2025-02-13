import { useEffect, useRef, useState } from 'react';

export const usePillarAppHeader = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null,
  );
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [parentHeight, setParentHeight] = useState(0);
  const firstPanelRef = useRef<HTMLDivElement>(null);
  const secondPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate the combined height of first and second panels
    const calculateHeight = () => {
      const firstPanelHeight = firstPanelRef.current?.offsetHeight || 0;
      const secondPanelHeight = secondPanelRef.current?.offsetHeight || 0;
      setParentHeight(firstPanelHeight + secondPanelHeight); // Set the total height of the parent div
    };

    // Initial calculation of height
    calculateHeight();

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Only start checking scroll direction after 60px
      if (currentScroll <= 230) {
        setScrollDirection(null); // No transition if below 60px
        setIsCollapsed(false);
        return;
      }

      // Determine Scroll Direction
      if (currentScroll > scrollPos) {
        setScrollDirection('down');
        setIsCollapsed(true); // Collapsed when scrolling down after 120px
      } else if (currentScroll < scrollPos) {
        setScrollDirection('up');
        setIsCollapsed(false); // Expanded when scrolling up
      }

      setScrollPos(currentScroll);
    };

    // Recalculate height on window resize
    window.addEventListener('resize', calculateHeight);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', calculateHeight);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPos]);

  return {
    parentHeight,
    isCollapsed,
    scrollDirection,
    firstPanelRef,
    secondPanelRef,
  };
};
