import React from 'react';

import { cn } from '@/shared/utils/cn';

const DEFAULT_CLASSNAME = 'font-semibold text-base lg:text-xl';

interface Props extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Title = ({ as = 'span', children, ...props }: Props) => {
  const className = cn(DEFAULT_CLASSNAME, props.className);
  return React.createElement(as, { ...props, className }, children);
};
