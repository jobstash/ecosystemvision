'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@heroui/button';

import { cn } from '@/shared/utils/cn';

import { useCloseNav } from './use-close-nav';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

interface BartabProps {
  icon?: React.ReactNode;
  text: string;
  href: string;
  isMobile?: boolean;
  endContent?: React.ReactNode;
}

export const Bartab = (props: BartabProps) => {
  const {
    icon = null,
    text,
    href,
    isMobile = false,
    endContent = null,
  } = props;

  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  const { closeNav } = useCloseNav();

  const { startTransition } = usePendingRoute();
  const router = useRouter();

  const handleClick = () => {
    closeNav();
    startTransition(() => {
      router.push(href);
    });
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
        className={cn('grow text-2xl text-white md:text-sm', {
          'text-black fill-black': isActive && !isMobile,
        })}
      >
        {text}
      </span>
      {endContent}
    </Button>
  );
};
