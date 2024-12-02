'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button } from '@nextui-org/button';
import { PrimitiveAtom, useSetAtom } from 'jotai';

import { cn } from '@/shared/utils/cn';
import { normalizeString } from '@/shared/utils/normalize-string';

import { TPillarItem, TPillarItemMap } from '@/search/core/types';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  item: TPillarItem;
  isActive: boolean;
  hiddenItemsAtom: PrimitiveAtom<TPillarItemMap>;
}

export const PillarItem = ({ item, isActive, hiddenItemsAtom }: Props) => {
  const { label, href } = item;

  const router = useRouter();

  const { isPendingPillarRoute, startTransition } = usePillarRoutesContext();

  const onNavigate = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  const { ref: inViewRef, inView } = useInView({
    threshold: 1,
    // triggerOnce: true,
  });

  const setHiddenItems = useSetAtom(hiddenItemsAtom);
  useEffect(() => {
    setHiddenItems((prev) => {
      const updatedHiddenItems = new Map(prev);
      const itemSlug = normalizeString(label);

      inView
        ? updatedHiddenItems.delete(itemSlug)
        : updatedHiddenItems.set(itemSlug, item);

      return updatedHiddenItems;
    });
  }, [inView, isActive, item, label, setHiddenItems]);

  return (
    <Button
      as={Link}
      href={href}
      key={label}
      ref={inViewRef}
      radius="md"
      className={cn({ 'border border-white/60': isActive })}
      variant={isActive ? 'bordered' : 'faded'}
      isDisabled={isPendingPillarRoute}
      tabIndex={inView ? undefined : -1}
      onClick={() => onNavigate(href)}
    >
      {label}
    </Button>
  );
};
