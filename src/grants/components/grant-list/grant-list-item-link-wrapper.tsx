'use client';

import Link from 'next/link';
import React from 'react';

import { sendGAEvent } from '@next/third-parties/google';

import { GA_EVENT, ROUTE_SECTIONS } from '@/shared/core/constants';

import { GRANT_TEST_IDS } from '@/grants/core/constants';

interface Props {
  slug: string;
  children: React.ReactNode;
}

export const GrantListItemLinkWrapper = ({ slug, children }: Props) => {
  const sendAnalytics = () => {
    sendGAEvent('event', GA_EVENT.GRANTS.GRANT_ITEM_CLICK, {
      value: slug,
    });
  };

  return (
    <Link
      prefetch
      href={`/${ROUTE_SECTIONS.IMPACT}/${slug}`}
      className="flex flex-wrap items-center justify-between rounded-2xl bg-gradient-to-r  from-[#191919] to-[#0D0D0D] p-4 text-13 text-white transition-all duration-300 md:p-5 lg:flex-nowrap"
      data-uuid={slug}
      data-testid={GRANT_TEST_IDS.GRANT_ITEM}
      onClick={sendAnalytics}
    >
      {children}
    </Link>
  );
};
