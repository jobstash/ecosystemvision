'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { buttonVariants } from '@heroui/react';

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

  const buttonClassName = cn(buttonVariants({ fullWidth: true }), 'justify-start rounded-lg hover:bg-white/15', {
    'bg-transparent': isMobile,
    'bg-white/5': !isActive && !isMobile,
    'is-active': isActive && !isMobile,
  });

  return (
    <Link
    href={href}
    className={buttonClassName}
    onClick={(event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      handleClick();
    }}
    data-active={isActive}>{icon}<span
      className={cn('grow text-2xl text-white md:text-sm', {
        'text-black fill-black': isActive && !isMobile,
      })}
    >
      {text}
    </span>
    {endContent}</Link>
  );
};
