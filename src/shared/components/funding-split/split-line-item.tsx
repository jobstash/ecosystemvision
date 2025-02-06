import { Tooltip } from '@heroui/tooltip';

import { cn } from '@/shared/utils/cn';
import { Heading } from '@/shared/components/heading';

import { LineItem } from './types';

const STRIPE_ANGLES = [45, -45, 90, 0, 60, -60] as const;

const createStripePattern = (index: number) => {
  const angleIndex = index % STRIPE_ANGLES.length;
  return `repeating-linear-gradient(${STRIPE_ANGLES[angleIndex]}deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)`;
};

interface Props {
  item: LineItem;
  index: number;
}

export const SplitLineItem = ({ item, index }: Props) => {
  return (
    <Tooltip
      delay={0}
      placement="bottom"
      content={
        <div className="flex flex-col gap-2 p-2">
          <Heading text={item.title} className="text-lg" />
          {item.raised && (
            <span className="text-xs text-white/80">Raised: {item.raised}</span>
          )}
          {item.info && (
            <span className="text-xs text-white/80">{item.info}</span>
          )}
          {item.date && (
            <span className="text-xs text-white/80">Date: {item.date}</span>
          )}
        </div>
      }
    >
      <div
        className={cn('h-full hover:bg-red-500/80', {
          'bg-blue-500/80': item.isActive,
        })}
        style={{
          width: `${item.percentage}%`,
          backgroundImage: createStripePattern(index),
        }}
      />
    </Tooltip>
  );
};
