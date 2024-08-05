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
        'flex items-center gap-3 [&>*]:self-center',
        classNames?.root,
      )}
    >
      <div className={cn('size-10', classNames?.logoWrapper)}>
        <Avatar
          className={cn('h-full w-full', classNames?.logo)}
          showFallback
          radius="lg"
          src={logo ?? ''}
          name={name}
        />
      </div>

      <div className={cn('flex flex-col', classNames?.titleWrapper)}>
        <span className={cn('font-bold', classNames?.title)}>{name}</span>
        <span className={cn('text-sm text-white/60', classNames?.category)}>
          {category}
        </span>
      </div>
    </div>
  );
};
