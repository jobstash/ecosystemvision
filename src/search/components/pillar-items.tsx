import Link from 'next/link';

import { Button } from '@nextui-org/button';

import { cn } from '@/shared/utils/cn';
import { normalizeString } from '@/shared/utils/normalize-string';

interface Props {
  itemParam: string;
  items: { label: string; href: string }[];
}

export const PillarItems = ({ itemParam, items }: Props) => {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-4">
      {items.map(({ label, href }) => {
        const isActive =
          normalizeString(label) === itemParam ||
          (label.toLowerCase().includes('all') && itemParam === 'all');

        return (
          <Button
            key={label}
            as={Link}
            href={href}
            className={cn({ 'border border-white/60': isActive })}
            variant={isActive ? 'bordered' : 'faded'}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};
