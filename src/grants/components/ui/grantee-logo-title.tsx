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
        'flex items-center [&>*]:self-center',
        classNames?.root,
      )}
    >
      <div className={cn('', classNames?.logoWrapper)}>
        <Avatar
          className={cn('hidden h-full w-full', classNames?.logo)}
          showFallback
          src={logo ?? ''}
          name={name}
        />
      </div>

      <div className={cn('flex flex-col', classNames?.titleWrapper)}>
        <span className={cn('text-2xl font-bold leading-6', classNames?.title)}>{name}</span>
        <span className={cn('hidden', classNames?.category)}>
          {category}
        </span>
      </div>
    </div>
  );
};
