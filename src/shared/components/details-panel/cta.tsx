'use client';

import Link from 'next/link';

import { buttonVariants } from '@heroui/react';

import { cn } from '@/shared/utils/cn';

interface Props {
  text: string;
  href: string;
  isNewTab?: boolean;
  isActive?: boolean;
}

export const DetailsPanelCTA = (props: Props) => {
  const { text, href, isNewTab, isActive = true } = props;

  return (
    <Link
      href={href}
      target={isNewTab ? '_blank' : undefined}
      rel={isNewTab ? 'noopener noreferrer' : undefined}
      className={cn(buttonVariants(), 'flex items-center rounded-lg p-2 px-4', {
        'is-active': isActive,
        'bg-white/10': !isActive,
      })}
    >
      <span className="shrink-0 text-xs sm:text-sm">{text}</span>
    </Link>
  );
};
