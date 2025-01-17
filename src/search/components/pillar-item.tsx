'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

import { Button } from "@heroui/button";
import { useSetAtom } from 'jotai';

import { cn } from '@/shared/utils/cn';

import { TPillarItem } from '@/search/core/types';
import { hiddenPillarItemsAtom } from '@/search/core/atoms';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  isMainPillarItem: boolean;
  item: TPillarItem;
  pillarSlug: string;
}

export const PillarItem = ({ item, isMainPillarItem, pillarSlug }: Props) => {
  const { isActive, label, href } = item;

  const router = useRouter();
  const { isPendingPillarRoute, startTransition } = usePillarRoutesContext();

  const setHiddenItems = useSetAtom(hiddenPillarItemsAtom);
  const { ref: inViewRef } = useInView({
    onChange: (inView) => {
      setHiddenItems((prev) => {
        const newState = { ...prev };

        // Initialize Set if pillar doesn't exist
        if (!newState[pillarSlug]) {
          newState[pillarSlug] = [];
        }

        // Update hidden items set
        let pillarHiddenItems = [...newState[pillarSlug]];

        if (!inView) {
          pillarHiddenItems.unshift(label);
        } else {
          pillarHiddenItems = pillarHiddenItems.filter(
            (itemLabel) => itemLabel !== label,
          );
        }

        // Remove pillar key if empty
        if (pillarHiddenItems.length > 0) {
          newState[pillarSlug] = pillarHiddenItems;
        } else {
          delete newState[pillarSlug];
        }

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
    'pointer-events-none text-accent2 border-accent2': isMainPillarItem,
  });

  const variant = isActive || isMainPillarItem ? 'bordered' : 'faded';

  return (
    <Button
      as={Link}
      href={href}
      ref={inViewRef}
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
