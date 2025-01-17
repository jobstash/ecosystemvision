'use client';

import { Button } from '@heroui/button';
import { sendGAEvent } from '@next/third-parties/google';

import { GA_EVENT } from '@/shared/core/constants';

interface Props {
  slug: string;
}

export const ViewImpactButton = ({ slug }: Props) => {
  const sendAnalytics = () => {
    sendGAEvent('event', GA_EVENT.GRANTS.VIEW_IMPACT, { value: slug });
  };

  return (
    <div className="flex w-full lg:hidden">
      <Button
        className="mx-auto w-full rounded-xl border border-white/20 font-semibold"
        variant="bordered"
        onClick={sendAnalytics}
      >
        <span>View Impact</span>
      </Button>
    </div>
  );
};
