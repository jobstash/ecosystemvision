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
    <div className={cn('flex flex-wrap items-center', classNames?.root)}>
      {icon && <div className={cn('pr-2')}>{icon}</div>}

      {label && (
        <span
          className={cn(
            'text-labels/75 pr-2',
            classNames?.label,
            label === 'Description' ? 'hidden lg:block' : '',
          )}
        >
          {label}
        </span>
      )}

      <div>{value}</div>
    </div>
  );
};

interface DetailItemsProps {
  items: DetailItemProps[];
  classNames?: {
    container?: ClassValue;
  } & DetailItemProps['classNames'];
}

export const DetailItems = ({ items, classNames }: DetailItemsProps) => {
  const rootClassName = cn('flex flex-wrap', classNames?.container);

  return (
    <div className={rootClassName}>
      {items.map((itemProps, index) => (
        <DetailItem
          key={index}
          classNames={{ root: classNames?.root, label: classNames?.label }}
          {...itemProps}
        />
      ))}
    </div>
  );
};
