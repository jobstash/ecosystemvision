'use client';

import { Chip } from '@heroui/chip';
import { Tooltip } from '@heroui/tooltip';

import { cn } from '@/shared/utils/cn';

import { LabeledItem } from './types';

interface Props {
  item: LabeledItem;
  isLoading: boolean;
  onClose: (item: LabeledItem) => void;
}

export const PillarSearchInputItem = ({ item, isLoading, onClose }: Props) => {
  const { pillar, slug, label } = item;

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
