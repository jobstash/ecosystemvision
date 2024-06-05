import Link from 'next/link';

import { Button } from '@nextui-org/button';

import { cn } from '@/shared/utils/cn';
import { getGradientBorderStyle } from '@/shared/utils/get-gradient-border-style';

interface TabProps {
  text: string;
  href: string;
  isActive?: boolean;
}

export const DetailsPanelTab = ({ href, isActive, text }: TabProps) => {
  const linkStyle = isActive ? getGradientBorderStyle() : undefined;

  const wrapperClassName =
    'flex h-10 shrink-0 items-center justify-center rounded-lg border border-white/20 px-4 py-2 sm:h-12 md:h-8';

  const contentClassName = cn(
    `rounded-lg border border-transparent font-lato text-sm`,
    {
      'border-0': isActive, // Prevent active border layout shift
    },
  );

  return (
    <Button
      as={Link}
      href={href}
      data-active={isActive}
      className={wrapperClassName}
      style={linkStyle}
      scroll={false}
    >
      <span className={contentClassName}>{text}</span>
    </Button>
  );
};
