import { createElement } from 'react';

import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';

interface Props {
  text: string;
  className?: ClassValue;
  htmlTag?: 'span' | 'p' | 'li';
}

export const Text = (props: Props) => {
  const { text, className, htmlTag = 'span' } = props;
  const textClassName = cn('font-roboto text-sm text-white/70', className);

  return createElement(htmlTag, { className: textClassName }, text);
};
