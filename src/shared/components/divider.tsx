import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';

interface Props {
  className?: ClassValue;
}

const DIVIDER_CONTAINER_CLASS = 'w-full';
const DIVIDER_LINE_CLASS = 'w-full border-t border-white/10';

export const Divider = (props: Props) => {
  const { className } = props;

  const containerClassName = cn(DIVIDER_CONTAINER_CLASS, className);

  return (
    <div className={containerClassName}>
      <hr className={DIVIDER_LINE_CLASS} />
    </div>
  );
};
