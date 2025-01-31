'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@heroui/button';
import { sendGAEvent } from '@next/third-parties/google';

import { ROUTE_SECTIONS } from '@/shared/core/constants';

interface Props {
  gaEvent: string;
  slug: string;
}

/**
 * Need to implement this as button (instead of link) to avoid nested links
 * Parent card is already a link, so it'll throw react minification error
 */
export const MainCTAButton = ({ gaEvent, slug }: Props) => {
  const router = useRouter();
  const onClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    sendGAEvent('event', gaEvent, { value: slug });
    router.push(`/${ROUTE_SECTIONS.GRANTS}/info/${slug}`);
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
