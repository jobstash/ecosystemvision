import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';

export interface DetailItemProps {
  label?: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  classNames?: {
    root?: ClassValue;
    label?: ClassValue;
  };
}

export const DetailItem = ({
  label,
  value,
  icon,
  classNames,
}: DetailItemProps) => {
  return (
    <div className={cn('flex items-center gap-2', classNames?.root)}>
      {icon}

      {label && (
        <span className={cn('text-white/80', classNames?.label)}>{label}:</span>
      )}

      {value}
    </div>
  );
};

interface DetailItemsProps {
  items: DetailItemProps[];
  classNames?: {
    root: ClassValue;
  };
}

export const DetailItems = ({ items, classNames }: DetailItemsProps) => {
  const rootClassName = cn(
    'flex flex-wrap items-center gap-4',
    classNames?.root,
  );

  return (
    <div className={rootClassName}>
      {items.map((itemProps) => (
        <DetailItem key={itemProps.label} {...itemProps} />
      ))}
    </div>
  );
};
