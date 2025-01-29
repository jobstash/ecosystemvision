import { Spinner } from '@heroui/spinner';
import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';

const CENTERED_CLASSNAME = 'flex justify-center items-center';
const FULLWIDTH_CLASSNAME = 'w-full';

interface Props {
  classNames?: {
    wrapper: ClassValue;
    spinner: ClassValue;
  };
  isCentered?: boolean;
  isFullWidth?: boolean;
}

export const Loader = (props: Props) => {
  const { classNames, isCentered = true, isFullWidth = true } = props;
  return (
    <div
      className={cn(
        classNames?.wrapper,
        {
          [CENTERED_CLASSNAME]: isCentered,
        },
        {
          [FULLWIDTH_CLASSNAME]: isFullWidth,
        },
      )}
    >
      <Spinner size="sm" color="white" className={cn(classNames?.spinner)} />
    </div>
  );
};
