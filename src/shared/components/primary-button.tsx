import { Button, ButtonProps } from '@heroui/button';
import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';

interface Props extends ButtonProps {
  text: string;
  classNames?: {
    button?: ClassValue;
    text?: ClassValue;
  };
  isActive: boolean;
}

const TEXT_CLASS_NAME = 'shrink-0 text-xs sm:text-sm';
const BUTTON_CLASS_NAME = 'flex items-center rounded-lg p-2 px-4';

export const PrimaryButton = (props: Props) => {
  const { text, classNames, isActive, ...rest } = props;

  const buttonClassName = cn(BUTTON_CLASS_NAME, classNames?.button, {
    'is-active': isActive,
    'bg-white/10': !isActive,
  });

  const textClassName = cn(TEXT_CLASS_NAME, classNames?.text);

  return (
    <Button className={buttonClassName} {...rest}>
      <span className={textClassName}>{text}</span>
    </Button>
  );
};
