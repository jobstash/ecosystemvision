'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Chip } from '@heroui/chip';
import { Skeleton } from '@heroui/skeleton';
import { Tooltip } from '@heroui/tooltip';

import { cn } from '@/shared/utils/cn';

import { LabeledItem } from '@/search/core/types';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  item: LabeledItem;
}

export const PillarSearchInputItem = ({ item }: Props) => {
  const { pillar, slug, label } = item;

  const router = useRouter();

  const { isPendingPillarRoute: isLoading, startTransition } =
    usePillarRoutesContext();

  const [showSpinner, setShowSpinner] = useState(false);

  const onClose = (item: LabeledItem) => {
    setShowSpinner(true);
    startTransition(() => {
      router.push(item.href || '/search');
      setShowSpinner(false);
    });
  };

  if (showSpinner) return <Skeleton className="flex h-7 w-20 rounded-lg" />;

  return (
    <Tooltip
      content={
        !label ? <TooltipContent pillarSlug={pillar} slug={slug} /> : null
      }
    >
      <Chip
        key={label}
        classNames={{
          base: cn('rounded-lg bg-white/10', {
            'border border-red-800 text-red-500 bg-transparent': !label,
          }),
        }}
        isDisabled={isLoading}
        onClose={() => onClose(item)}
      >
        {label || slug}
      </Chip>
    </Tooltip>
  );
};

const TooltipContent = ({
  pillarSlug,
  slug,
}: {
  pillarSlug: string;
  slug: string;
}) => {
  return (
    <span>
      No {pillarSlug} matched:{' '}
      <span className="font-bold text-red-500">&#34;{slug}&#34;</span>
    </span>
  );
};
