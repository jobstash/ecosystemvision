import { ClassValue } from 'clsx';

import { TEST_IDS } from '@/shared/core/constants';
import { cn } from '@/shared/utils/cn';

import { MenuButton } from './menu-button';

interface Props {
  left: React.ReactNode;
  className?: ClassValue;
}

export const MobileHeader = ({ left, className }: Props) => {
  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-50 flex w-full items-center justify-between px-5 py-2 backdrop-blur-md md:h-20  lg:hidden',
        className,
      )}
    >
      {left}
      <MenuButton testId={TEST_IDS.MOBILE_MENU} />
    </div>
  );
};
