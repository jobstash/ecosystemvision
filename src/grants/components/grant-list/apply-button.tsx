'use client';

import { sendGAEvent } from '@next/third-parties/google';
import { Button } from '@nextui-org/button';

import { openNewTab } from '@/shared/utils/open-new-tab';

interface Props {
  url: string | null;
  gaEvent: string;
  value: string;
  text?: string;
}

/**
 * Need to implement this as button (instead of link) to avoid nested links
 * Parent card is already a link, so it'll throw react minification error
 */
export const ApplyButton = ({
  url,
  gaEvent,
  value,
  text = 'View Program',
}: Props) => {
  if (!url) return null;

  const onClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    sendGAEvent('event', gaEvent, { value });

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
