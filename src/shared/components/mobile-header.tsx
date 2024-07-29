import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';

import { TEST_IDS } from '../core/constants';

import { MenuButton } from './menu-button';

interface Props {
  left: React.ReactNode;
  className?: ClassValue;
}

export const MobileHeader = ({ left, className }: Props) => {
  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-10 flex h-[70px] w-full items-center justify-between border-b border-white/10 bg-[#191919] p-4 py-2 md:hidden md:h-20',
        className,
      )}
    >
      {left}
      <MenuButton testId={TEST_IDS.MOBILE_MENU} />
    </div>
  );
};
