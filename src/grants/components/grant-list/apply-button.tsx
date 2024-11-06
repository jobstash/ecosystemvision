'use client';

import { Button } from '@nextui-org/react';

import { openNewTab } from '@/shared/utils/open-new-tab';

interface Props {
  url: string | null;
  text?: string;
}

/**
 * Need to implement this as button (instead of link) to avoid nested links
 * Parent card is already a link, so it'll throw react minification error
 */
export const ApplyButton = ({ url, text = 'View Program' }: Props) => {
  if (!url) return null;

  const onClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openNewTab(url);
  };

  return (
    <Button
      className="is-active mx-auto w-full font-semibold text-black"
      onClick={onClick}
    >
      <span>{text}</span>
    </Button>
  );
};
