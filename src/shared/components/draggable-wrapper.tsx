'use client';

import { ReactNode, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

import { ClassValue } from 'clsx';

import { TEST_IDS } from '@/shared/core/constants';
import { cn } from '@/shared/utils/cn';

interface Props {
  children: ReactNode;
  className?: ClassValue;
}

const WRAPPER_CLASSNAME = 'hide-scrollbar p-1 overflow-auto';

export const DraggableWrapper = (props: Props) => {
  const { children, className } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { events } = useDraggable(
    ref as React.MutableRefObject<HTMLDivElement>,
  );

  return (
    <div
      className={cn(WRAPPER_CLASSNAME, className)}
      ref={ref}
      data-testid={TEST_IDS.DETAILS_PANEL_TABS}
      {...events}
    >
      {children}
    </div>
  );
};
