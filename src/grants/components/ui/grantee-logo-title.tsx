import { Avatar } from '@nextui-org/react';
import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';

import { Grantee } from '@/grants/core/schemas';

interface Props extends Pick<Grantee, 'name' | 'logo' | 'category'> {
  classNames?: {
    root?: ClassValue;
    logo?: ClassValue;
    logoWrapper?: ClassValue;
    titleWrapper?: ClassValue;
    title?: ClassValue;
    category?: ClassValue;
  };
}

export const GranteeLogoTitle = (props: Props) => {
  const { name, logo, category, classNames } = props;
  return (
    <div
      className={cn(
        'flex items-center md:pb-4',
        classNames?.root,
      )}
    >
      <div className={cn('md:pr-4', classNames?.logoWrapper)}>
        <Avatar
          className={cn('hidden md:block md:h-16 md:w-16 md:rounded-[24px]', classNames?.logo)}
          showFallback
          src={logo ?? ''}
          name={name}
        />
      </div>

      <div className={cn('flex flex-col', classNames?.titleWrapper)}>
        <span className={cn('text-2xl font-bold leading-6 md:text-base md:font-medium', classNames?.title)}>{name}</span>
        <span className={cn('hidden text-cool-gray md:block md:text-13', classNames?.category)}>
          {category}
        </span>
      </div>
    </div>
  );
};
