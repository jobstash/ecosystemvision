'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button, Chip, Skeleton, Tooltip } from '@heroui/react';

import { cn } from '@/shared/utils/cn';

import { LabeledItem } from '@/search/core/types';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

interface Props {
  item: LabeledItem;
}

export const PillarSearchInputItem = ({ item }: Props) => {
  const { pillar, slug, label } = item;

  const router = useRouter();

  const { isPendingRoute: isLoading, startTransition } = usePendingRoute();

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
    <Tooltip isDisabled={!!item.href || !!label}>
      <Tooltip.Trigger tabIndex={0}>
        <Chip
          key={label}
          className={cn('rounded-lg bg-white/10', {
            'border border-red-800 text-red-500 bg-transparent': !label,
          })}
        >
          <Chip.Label>{label || slug}</Chip.Label>
          <Button isIconOnly size="sm" variant="ghost"
            className="size-5 min-h-0 min-w-0"
            aria-label={`Remove ${label || slug}`}
            isDisabled={isLoading}
            onPress={() => onClose(item)}>
            <span aria-hidden="true">×</span>
          </Button>
        </Chip>
      </Tooltip.Trigger>
      <Tooltip.Content><TooltipContent pillarSlug={pillar} slug={slug} /></Tooltip.Content>
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
