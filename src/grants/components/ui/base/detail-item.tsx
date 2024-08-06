import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';
import { Divider } from '@/shared/components/divider';

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
      {icon && <div className={cn('hidden')}>{icon}</div>}

      {label === 'Description' && <Divider className="mb-3"/>}

      {label && (
        <span
          className={cn(
            'pr-2 text-labels/75',
            classNames?.label,
            label === 'Description' ? 'hidden lg:block' : '',
          )}
        >
          {label}
        </span>
      )}

      {value}
      {label === 'Description' && <Divider className="mt-3" />}

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
  const rootClassName = cn(
    'flex flex-wrap',
    classNames?.container,
  );

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
