import Image from 'next/image';

import { Skeleton } from '@heroui/skeleton';

interface Props {
  src: string;
  name?: string;
  children?: React.ReactNode;
}

const CONTAINER_CLASSNAME = 'flex items-center gap-3';
const NAME_CLASSNAME = 'font-bold';

export const LogoTitle = (props: Props) => {
  const { src, name, children } = props;
  let content = children ?? null;

  if (name && !content) {
    content = <h3 className={NAME_CLASSNAME}>{name}</h3>;
  }

  return (
    <div className={CONTAINER_CLASSNAME}>
      <div className="relative size-10 min-h-[40px] min-w-[40px] overflow-hidden rounded-full object-cover">
        <Image fill src={src} alt={name ?? ''} sizes="(max-width: 64px)" />
      </div>
      {content}
    </div>
  );
};

export const LogoTitleSkeleton = () => (
  <div className={CONTAINER_CLASSNAME}>
    <Skeleton className="flex size-10 rounded-full" />
    <Skeleton className="h-4 w-24 rounded-md" />
  </div>
);
