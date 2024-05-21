import { ClassValue } from 'clsx';

import { InfoTagProps } from '@/shared/core/types';
import { cn } from '@/shared/utils/cn';

import { DraggableWrapper } from './draggable-wrapper';
import { InfoTag, InfoTagSkeleton } from './info-tag';

interface Props {
  tags: InfoTagProps[];
  isCompact?: boolean;
  isDraggable?: boolean;
  classNames?: {
    wrapper: ClassValue;
  };
}

const DEFAULT_WRAPPER_CLASSNAME = 'flex items-center gap-4';
const WRAPPER_CLASSNAME_WITH_FLEX_WRAP = cn(
  DEFAULT_WRAPPER_CLASSNAME,
  'flex-wrap',
);

export const InfoTags = ({
  tags,
  isCompact,
  isDraggable,
  classNames,
}: Props) => {
  if (!tags.length) return null;

  const wrapperClassName = cn(DEFAULT_WRAPPER_CLASSNAME, classNames?.wrapper);
  const content = (
    <>
      {tags.map((tag, i) => (
        <InfoTag key={`${tag.text}-${i}`} tag={tag} isCompact={isCompact} />
      ))}
    </>
  );

  if (isDraggable) {
    return (
      <DraggableWrapper className={wrapperClassName}>
        {content}
      </DraggableWrapper>
    );
  }

  return <div className={WRAPPER_CLASSNAME_WITH_FLEX_WRAP}>{content}</div>;
};

interface SkeletonProps extends Pick<Props, 'isCompact' | 'isDraggable'> {
  count?: number;
}

export const InfoTagsSkeleton = ({
  isCompact,
  count = 3,
  isDraggable,
}: SkeletonProps) => {
  const content = (
    <>
      {Array.from({ length: count }, (_, i) => (
        <InfoTagSkeleton key={i} isCompact={isCompact} />
      ))}
    </>
  );

  if (isDraggable) {
    return (
      <DraggableWrapper className={DEFAULT_WRAPPER_CLASSNAME}>
        {content}
      </DraggableWrapper>
    );
  }

  return <div className={WRAPPER_CLASSNAME_WITH_FLEX_WRAP}>{content}</div>;
};
