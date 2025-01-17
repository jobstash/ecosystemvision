'use client';

import { Button } from "@heroui/button";

import { reloadPage } from '@/shared/utils/reload-page';

interface Props {
  text?: string;
  onClick?: () => void;
}

const DEFAULT_TEXT = 'Reload Page';
const DEFAULT_ONCLICK = () => reloadPage();

export const ErrorActionButton = (props: Props) => {
  const { text = DEFAULT_TEXT, onClick = DEFAULT_ONCLICK } = props;

  return (
    <Button
      className="is-active flex items-center rounded-lg p-2 px-4"
      onClick={onClick}
    >
      <span className="shrink-0 text-xs font-semibold sm:text-sm">{text}</span>
    </Button>
  );
};
