import { ErrorBoundaryProps } from '@/shared/core/types';

import { ErrorAction } from './error-action';
import { ErrorActionButton } from './error-action-button';

const IMG_SRC = '/vortex.png';
const IMAGE_CLASSNAME = 'animate-spin-slow';
const HEADING_TEXT = 'Serious Error';
const MESSAGE_TEXT =
  'All shortcuts have disappeared. Screen. Mind. Both are blank';

interface Props extends Partial<ErrorBoundaryProps> {
  showReset?: boolean;
  onReset?: () => void;
}

export const InternalErrorResult = ({
  showReset = true,
  onReset,
  reset,
}: Props) => {
  const text = {
    heading: HEADING_TEXT,
    message: MESSAGE_TEXT,
  };

  const img = {
    src: IMG_SRC,
  };

  const classNames = {
    image: IMAGE_CLASSNAME,
  };

  const onClick = () => {
    if (reset) reset();
    if (onReset) onReset();
  };

  const action = showReset ? <ErrorActionButton onClick={onClick} /> : null;

  return (
    <ErrorAction
      textContent={text}
      imageProps={img}
      classNames={classNames}
      action={action}
    />
  );
};
