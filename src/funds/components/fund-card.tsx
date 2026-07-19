'use client';

import Link from 'next/link';

import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Divider } from '@/shared/components/divider';
import { LogoTitle } from '@/shared/components/logo-title';

import type { FundListItem } from '@/funds/core/schemas';
import { activeFundSlugAtom } from '@/funds/core/atoms';

export const FundCard = ({ fund }: { fund: FundListItem }) => {
  const website = fund.website ?? '';
  const content = (
    <div className="flex flex-col gap-3 p-6">
      <LogoTitle
        src={getLogoUrl(website, fund.logoUrl) || '/placeholder.png'}
        name={fund.name}
      />
      <Divider />
      <div className="flex flex-wrap gap-4 text-sm text-white/70">
        <span>{fund.portfolioCount.toLocaleString()} portfolio companies</span>
        <span>{fund.staffCount.toLocaleString()} team members</span>
      </div>
    </div>
  );

  return (
    <CardWrapper id={fund.normalizedName} idAtom={activeFundSlugAtom}>
      {website ? (
        <Link href={website} target="_blank" rel="noreferrer">
          {content}
        </Link>
      ) : (
        content
      )}
    </CardWrapper>
  );
};
