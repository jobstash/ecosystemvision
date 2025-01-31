'use client';

import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

import { Button } from '@heroui/button';
import { sendGAEvent } from '@next/third-parties/google';

import { GA_EVENT, ROUTE_SECTIONS } from '@/shared/core/constants';

interface Props {
  slug: string;
}

export const ViewImpactButton = ({ slug }: Props) => {
  const router = useRouter();
  const onClick: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    sendGAEvent('event', GA_EVENT.GRANTS.VIEW_IMPACT, { value: slug });
    router.push(`/${ROUTE_SECTIONS.IMPACT}/${slug}`);
  };

  return (
    <div className="flex w-full lg:hidden">
      <Button
        className="mx-auto w-full rounded-xl border border-white/20 font-semibold"
        variant="bordered"
        onClick={onClick}
      >
        <span>View Impact</span>
      </Button>
    </div>
  );
};
