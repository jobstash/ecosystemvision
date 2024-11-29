'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';

import { cn } from '@/shared/utils/cn';
import { normalizeString } from '@/shared/utils/normalize-string';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  itemParam: string;
  items: { label: string; href: string }[];
}

export const PillarItems = ({ itemParam, items }: Props) => {
  const router = useRouter();

  const { isPendingPillarRoute, startTransition } = usePillarRoutesContext();

  if (items.length === 0) return null;

  const onNavigate = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <div className="flex flex-wrap gap-4">
      {items.map(({ label, href }) => {
        const isActive =
          normalizeString(label) === itemParam ||
          (label.toLowerCase().includes('all') && itemParam === 'all');

        return (
          <Button
            key={label}
            className={cn({ 'border border-white/60': isActive })}
            variant={isActive ? 'bordered' : 'faded'}
            isDisabled={isPendingPillarRoute}
            onClick={() => onNavigate(href)}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};
