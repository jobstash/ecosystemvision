'use client';

import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { useIsDesktop } from '@/shared/hooks/use-media-query';

import { isDisabledPageScrollAtom } from '@/shared/core/atoms';

interface Props {
  shouldDisable: boolean;
}

/**
 * Disables page-scroll for non-desktop devices based on `shouldDisable` prop.
 * Fullscreen overlays often have scroll issues on elements behind.
 */
export const PageScrollDisableSyncer = ({ shouldDisable }: Props) => {
  const isMounted = useIsMounted();
  const isDesktop = useIsDesktop();
  const [isDisabled, setIsDisabled] = useAtom(isDisabledPageScrollAtom);

  useEffect(() => {
    if (isMounted && !isDesktop && isDisabled !== shouldDisable) {
      setIsDisabled(shouldDisable);
    }
  }, [isDesktop, isDisabled, isMounted, setIsDisabled, shouldDisable]);

  // Fix scroll disabled on resize (re-enable scroll on large devices)
  const checkOnResize = useCallback(() => {
    if (window.innerWidth >= DETAILS_BREAKPOINT && isDisabled) {
      setIsDisabled(false);
    }
  }, [isDisabled, setIsDisabled]);

  useEffect(() => {
    // Invoke check on init
    checkOnResize();

    window.addEventListener('resize', checkOnResize);

    return () => window.removeEventListener('resize', checkOnResize);
  }, [checkOnResize]);

  return null;
};

const DETAILS_BREAKPOINT = 1280;
