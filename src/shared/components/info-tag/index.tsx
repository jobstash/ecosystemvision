import { Skeleton } from '@heroui/skeleton';

import { InfoTagProps } from '@/shared/core/types';
import { cn } from '@/shared/utils/cn';
import { ExternalIcon } from '@/shared/components/icons/external-icon';

import { InfoTagLink } from './info-tag-link';

const DEFAULT_CLASSNAME =
  'flex h-6 shrink-0 items-center gap-x-2 rounded-[4px] py-1 pr-2 lg:rounded-md';
const LINK_CLASSNAME =
  'bg-white/10 cursor-pointer duration-300 transition-all px-2';
const COMPACT_CLASSNAME = 'h-10 sm:h-12 md:h-6';

interface Props {
  tag: InfoTagProps;
  isCompact?: boolean;
}

export const InfoTag = (props: Props) => {
  const { tag, isCompact } = props;
  const { text, link, icon, showExternalIcon } = tag;

  const className = cn(
    DEFAULT_CLASSNAME,
    { [LINK_CLASSNAME]: !!link },
    { [COMPACT_CLASSNAME]: isCompact },
  );

  const content = (
    <>
      <div className="shrink-0">{icon}</div>
      <span className="max-w-[32ch] truncate text-sm md:max-w-[44ch] lg:text-xs">
        {text}
      </span>
      <div className="shrink-0">{showExternalIcon && <ExternalIcon />}</div>
    </>
  );

  if (link) {
    return <InfoTagLink className={className} href={link} content={content} />;
  }

  return <div className={className}>{content}</div>;
};

export const InfoTagSkeleton = (props: Pick<Props, 'isCompact'>) => {
  const { isCompact } = props;
  const className = cn(DEFAULT_CLASSNAME, 'w-16 md:w-20', {
    [COMPACT_CLASSNAME]: isCompact,
  });

  return <Skeleton className={className} />;
};
