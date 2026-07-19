'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Skeleton } from '@heroui/skeleton';

interface Props {
  src: string;
  name?: string;
  children?: React.ReactNode;
}

const CONTAINER_CLASSNAME = 'flex items-center gap-3';
const NAME_CLASSNAME = 'font-bold';

interface LogoImageProps {
  src: string;
  name?: string;
  className?: string;
  sizes?: string;
}

export const LogoImage = ({
  src,
  name,
  className = 'size-10 min-h-[40px] min-w-[40px]',
  sizes = '40px',
}: LogoImageProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasImage = Boolean(src) && failedSrc !== src;

  return (
    <div
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-white/10 text-sm font-semibold text-white/70 ${className}`}
    >
      {hasImage ? (
        <Image
          fill
          src={src}
          alt={name ? `${name} logo` : ''}
          sizes={sizes}
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span aria-hidden="true">{name?.trim().charAt(0).toUpperCase() || '?'}</span>
      )}
    </div>
  );
};

export const LogoTitle = (props: Props) => {
  const { src, name, children } = props;
  let content = children ?? null;

  if (name && !content) {
    content = <h3 className={NAME_CLASSNAME}>{name}</h3>;
  }

  return (
    <div className={CONTAINER_CLASSNAME}>
      <LogoImage src={src} name={name} />
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
