'use client';

import { ReactNode, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';

interface Props {
  children: ReactNode;
  className?: ClassValue;
}

const WRAPPER_CLASSNAME = 'hide-scrollbar overflow-x-scroll p-1';

export const DraggableWrapper = (props: Props) => {
  const { children, className } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(
    ref as React.MutableRefObject<HTMLDivElement>,
  );

  return (
    <div className={cn(WRAPPER_CLASSNAME, className)} ref={ref} {...events}>
      {children}
    </div>
  );
};
