import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { Skeleton } from '@nextui-org/skeleton';

import { InfoTagProps } from '@/shared/core/types';
import { cn } from '@/shared/utils/cn';

import { ExternalIcon } from './icons/external-icon';

const DEFAULT_CLASSNAME =
  'flex h-6 shrink-0 items-center gap-x-2 rounded-[4px] py-1 pr-2 lg:rounded-md';
const LINK_CLASSNAME =
  'bg-white/10 hover:bg-white/40 cursor-pointer duration-300 transition-all px-2';
const COMPACT_CLASSNAME = 'h-10 sm:h-12 lg:h-6';

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
    { [COMPACT_CLASSNAME]: !isCompact },
  );

  const content = (
    <>
      {icon}
      <span className="text-sm lg:text-xs">{text}</span>
      {showExternalIcon && <ExternalIcon />}
    </>
  );

  if (link) {
    return (
      <Button
        as={Link}
        className={className}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </Button>
    );
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