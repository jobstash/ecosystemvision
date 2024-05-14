import Image from 'next/image';

import { cn } from '@/shared/utils/cn';

import { Heading } from './heading';
import { Text } from './text';

interface Props {
  action: React.ReactNode;
  textContent: {
    heading: string;
    message: string;
  };
  imageProps: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  classNames?: {
    image?: string;
  };
  isTransparent?: boolean;
}

const DEFAULT_IMAGE_DIMENSION = 300;

export const ErrorAction = (props: Props) => {
  const {
    action,
    textContent,
    imageProps,
    classNames = {},
    isTransparent,
  } = props;
  const { heading, message } = textContent;
  const {
    src,
    alt = heading,
    width = DEFAULT_IMAGE_DIMENSION,
    height = DEFAULT_IMAGE_DIMENSION,
  } = imageProps;
  const { image: imageClassName } = classNames;

  const containerClassName = cn(
    'flex flex-col items-center justify-center space-y-8 rounded-3xl bg-white/5 p-12',
    { 'bg-transparent': isTransparent },
  );

  return (
    <div className={containerClassName}>
      <Image
        priority
        src={src}
        quality={100}
        alt={alt}
        width={width}
        height={height}
        className={imageClassName}
      />

      <div className="flex flex-col items-center gap-y-2">
        <Heading text={heading} className="text-3xl" />
        <div className="flex max-w-sm flex-col gap-2 text-center">
          <Text text={message} className="text-base" />
        </div>
      </div>

      {action}
    </div>
  );
};
