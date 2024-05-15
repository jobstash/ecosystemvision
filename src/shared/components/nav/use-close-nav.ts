import { useAtom } from 'jotai';

import { showFullscreenNavAtom } from '@/shared/core/atoms';

export const useCloseNav = () => {
  const [showNav, setShowNav] = useAtom(showFullscreenNavAtom);

  const closeNav = () => {
    setShowNav(false);
  };

  return { showNav, closeNav };
};
