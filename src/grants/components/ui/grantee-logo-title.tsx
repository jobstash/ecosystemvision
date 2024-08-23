import { Avatar, Skeleton } from '@nextui-org/react';
import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';

import { Grantee } from '@/grants/core/schemas';

const CLASSNAMES = {
  WRAPPER: 'flex items-center md:pb-4',
  INNER: 'md:pr-4',
  AVATAR: 'mr-3 h-8 w-8 rounded-xl md:h-16 md:w-16 md:rounded-[24px]',
};

interface Props extends Pick<Grantee, 'name' | 'logoUrl'> {
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
  const { name, logoUrl, classNames } = props;
  const category = ''; // TODO: Confirm with team if grantee has category
  return (
    <div className={cn(CLASSNAMES.WRAPPER, classNames?.root)}>
      <div className={cn(CLASSNAMES.INNER, classNames?.logoWrapper)}>
        <Avatar
          className={cn(CLASSNAMES.AVATAR, classNames?.logo)}
          showFallback
          src={logoUrl ?? ''}
          name={name}
        />
      </div>

      <div className={cn('flex flex-col', classNames?.titleWrapper)}>
        <span
          className={cn(
            'text-lg font-bold leading-6 md:text-base md:font-medium',
            classNames?.title,
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            'hidden text-cool-gray md:block md:text-13',
            classNames?.category,
          )}
        >
          {category}
        </span>
      </div>
    </div>
  );
};

export const GranteeLogoTitleSkeleton = () => (
  <div className={CLASSNAMES.WRAPPER}>
    <div className={CLASSNAMES.INNER}>
      <Skeleton className={CLASSNAMES.AVATAR} />
    </div>
    <Skeleton className="h-5 w-3/4 rounded-md md:h-6 md:w-6/12 lg:h-7" />
  </div>
);
