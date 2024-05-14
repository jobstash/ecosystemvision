import { ClassValue } from 'clsx';

import { capitalize } from '@/shared/utils/capitalize';
import { cn } from '@/shared/utils/cn';

interface Props {
  text: string;
  className?: ClassValue;
  htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

const DEFAULT_TAG = 'h2';
const BASE_CLASS_NAME = 'font-lato text-xl font-bold';

export const Heading = (props: Props) => {
  const { text, className, htmlTag = DEFAULT_TAG } = props;
  const headingClassName = cn(BASE_CLASS_NAME, className);

  const Tag = htmlTag;

  return <Tag className={headingClassName}>{capitalize(text)}</Tag>;
};
