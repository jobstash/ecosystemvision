'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

import { Button } from '@heroui/button';
import { useSetAtom } from 'jotai';

import { cn } from '@/shared/utils/cn';

import { hiddenPillarItemsAtom } from '@/search/core/atoms';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  isActive: boolean;
  pillar: string;
  label: string;
  href: string;
}

export const PillarItem = ({ isActive, pillar, label, href }: Props) => {
  const router = useRouter();
  const { isPendingPillarRoute: isLoading, startTransition } =
    usePillarRoutesContext();

  const setHiddenItems = useSetAtom(hiddenPillarItemsAtom);
  const { ref: inViewRef } = useInView({
    onChange: (inView) => {
      setHiddenItems((prev) => {
        const newState = { ...prev };

        const hiddenItems = newState[pillar] || [];

        inView
          ? hiddenItems.splice(hiddenItems.indexOf(label), 1)
          : hiddenItems.unshift(label);

        newState[pillar] = hiddenItems;
        return newState;
      });
    },
  });

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
      ref={inViewRef}
      className={className}
      variant={variant}
      isDisabled={isLoading}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
