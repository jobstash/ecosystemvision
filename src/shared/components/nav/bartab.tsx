'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@nextui-org/button';

import { cn } from '@/shared/utils/cn';

import { useCloseNav } from './use-close-nav';

interface BartabProps {
  icon?: React.ReactNode;
  text: string;
  href: string;
  isMobile?: boolean;
}

export const Bartab = (props: BartabProps) => {
  const { icon = null, text, href, isMobile = false } = props;

  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  const { closeNav } = useCloseNav();

  const handleClick: React.MouseEventHandler = (event) => {
    event.stopPropagation();
    closeNav();
  };

  const buttonClassName = cn('justify-start hover:bg-white/15', {
    'bg-transparent': isMobile,
    'bg-white/5': !isActive && !isMobile,
    'is-active': isActive && !isMobile,
  });

  return (
    <Button
      fullWidth
      as={Link}
      href={href}
      radius="sm"
      startContent={icon}
      className={buttonClassName}
      onClick={handleClick}
      data-active={isActive}
    >
      <span
        className={cn('text-2xl text-white md:text-sm', {
          'text-black': isActive && !isMobile,
        })}
      >
        {text}
      </span>
    </Button>
  );
};
