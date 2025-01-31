'use client';

import { Button } from '@heroui/button';
import { sendGAEvent } from '@next/third-parties/google';

import { openNewTab } from '@/shared/utils/open-new-tab';

interface Props {
  gaEvent: string;
  slug: string;
  url: string | null;
}

/**
 * Need to implement this as button (instead of link) to avoid nested links
 * Parent card is already a link, so it'll throw react minification error
 */
export const ViewProgramButton = ({ gaEvent, slug, url }: Props) => {
  if (!url) return null;

  const onClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    sendGAEvent('event', gaEvent, { value: slug });
    openNewTab(url);
  };

  return (
    <Button
      className="is-active mx-auto w-full font-semibold text-black"
      onClick={onClick}
    >
      <span>View Program</span>
    </Button>
  );
};
