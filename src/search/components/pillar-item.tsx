'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';

import { cn } from '@/shared/utils/cn';

import { TPillarItem } from '@/search/core/types';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  isMainPillarItem: boolean;
  item: TPillarItem;
}

export const PillarItem = ({ item, isMainPillarItem }: Props) => {
  const { isActive, label, href } = item;

  const router = useRouter();
  const { isPendingPillarRoute, startTransition } = usePillarRoutesContext();

  const onClick = () => {
    startTransition(() => {
      router.push(href);
    });
  };

  const className = cn('border', {
    'border-white/60': isActive,
    'pointer-events-none text-accent2 border-accent2': isMainPillarItem,
  });

  const variant = isActive || isMainPillarItem ? 'bordered' : 'faded';

  return (
    <Button
      as={Link}
      href={href}
      radius="md"
      className={className}
      variant={variant}
      isDisabled={isPendingPillarRoute}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
