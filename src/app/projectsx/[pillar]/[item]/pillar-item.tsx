'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@heroui/button';

import { cn } from '@/shared/utils/cn';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  isActive: boolean;
  label: string;
  href: string;
}

export const PillarItem = ({ isActive, label, href }: Props) => {
  const router = useRouter();
  const { isPendingPillarRoute: isLoading, startTransition } =
    usePillarRoutesContext();

  const onClick = () => {
    startTransition(() => {
      router.push(href);
    });
  };

  const className = cn('border', {
    'border-white/60': isActive,
    'pointer-events-none text-accent2 border-accent2': !href,
  });

  const variant = isActive || !href ? 'bordered' : 'faded';

  return (
    <Button
      as={Link}
      href={href}
      radius="md"
      className={className}
      variant={variant}
      isDisabled={isLoading}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
