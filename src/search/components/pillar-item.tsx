'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

import { Button } from '@heroui/button';
import { useSetAtom } from 'jotai';

import { cn } from '@/shared/utils/cn';

import { hiddenPillarItemsAtom } from '@/search/core/atoms';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

interface Props {
  isActive: boolean;
  pillar: string;
  label: string;
  href: string;
}

export const PillarItem = ({ isActive, pillar, label, href }: Props) => {
  const router = useRouter();
  const { isPendingRoute: isLoading, startTransition } = usePendingRoute();

  const setHiddenItems = useSetAtom(hiddenPillarItemsAtom);
  const { ref: inViewRef } = useInView({
    threshold: 1,
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

  const className = cn({
    'border border-white/60': isActive,
  });

  const variant = isActive || !href ? 'bordered' : undefined;

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
