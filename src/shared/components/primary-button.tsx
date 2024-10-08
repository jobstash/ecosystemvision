import { Button, ButtonProps } from '@nextui-org/button';
import { ClassValue } from 'clsx';

import { cn } from '@/shared/utils/cn';

interface Props extends ButtonProps {
  text: string;
  classNames?: {
    button?: ClassValue;
    text?: ClassValue;
  };
}

const TEXT_CLASS_NAME = 'shrink-0 text-xs font-semibold sm:text-sm';
const BUTTON_CLASS_NAME = 'flex items-center rounded-lg is-active p-2 px-4';

export const PrimaryButton = ({ text, classNames, ...props }: Props) => {
  const buttonClassName = cn(BUTTON_CLASS_NAME, classNames?.button);
  const textClassName = cn(TEXT_CLASS_NAME, classNames?.text);

  return (
    <Button className={buttonClassName} {...props}>
      <span className={textClassName}>{text}</span>
    </Button>
  );
};
