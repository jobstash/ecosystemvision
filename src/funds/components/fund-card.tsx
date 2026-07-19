'use client';

import Link from 'next/link';

import {
  BriefcaseBusinessIcon,
  CalendarClockIcon,
  ChartNoAxesCombinedIcon,
  WalletIcon,
} from 'lucide-react';

import { formatNumber } from '@/shared/utils/format-number';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { shortTimestamp } from '@/shared/utils/short-timestamp';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Divider } from '@/shared/components/divider';
import { LogoTitle } from '@/shared/components/logo-title';

import type { FundListItem } from '@/funds/core/schemas';
import { formatActivityDate } from '@/funds/utils/format-activity-date';
import { activeFundSlugAtom } from '@/funds/core/atoms';

export const FundCard = ({
  fund,
  searchParams,
}: {
  fund: FundListItem;
  searchParams: Record<string, string>;
}) => {
  const detailQuery = new URLSearchParams(searchParams).toString();
  const activityPeriod = fund.activityFromDate
    ? `${formatActivityDate(fund.activityFromDate)}–${formatActivityDate(fund.activityToDate)}`
    : `All time–${formatActivityDate(fund.activityToDate)}`;
  const metrics = [
    {
      icon: <WalletIcon size={14} />,
      label:
        fund.knownRoundCapital === null
          ? 'No disclosed round capital'
          : `$${formatNumber(fund.knownRoundCapital)} across ${fund.knownRoundCount.toLocaleString()} disclosed rounds`,
    },
    {
      icon: <ChartNoAxesCombinedIcon size={14} />,
      label:
        fund.progressionRate === null
          ? 'No progression sample'
          : `${fund.progressionRate}% portfolio progression (${fund.progressedCompanyCount}/${fund.portfolioCount})`,
    },
    {
      icon: <CalendarClockIcon size={14} />,
      label: fund.lastInvestmentDate
        ? `Last investment ${shortTimestamp(fund.lastInvestmentDate)}`
        : 'No dated investments',
    },
    {
      icon: <BriefcaseBusinessIcon size={14} />,
      label: `${fund.portfolioCount.toLocaleString()} portfolio companies`,
    },
  ];

  const content = (
    <div className="flex flex-col gap-3 p-6">
      <LogoTitle
        src={getLogoUrl(fund.website ?? '', fund.logoUrl)}
        name={fund.name}
      />
      <Divider />
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
        <span className="w-full text-xs font-medium uppercase tracking-[0.14em] text-white/40">
          Activity {activityPeriod}
        </span>
        {metrics.map((metric) => (
          <span className="inline-flex items-center gap-2" key={metric.label}>
            {metric.icon}
            {metric.label}
          </span>
        ))}
        <span>{fund.staffCount.toLocaleString()} team members</span>
        {fund.socialStaffCount > 0 && (
          <span className="text-sky-300/80">
            {fund.socialStaffCount.toLocaleString()} team profiles with socials
          </span>
        )}
        {fund.soloRoundCount > 0 && (
          <span>
            {fund.soloRoundCount.toLocaleString()} recorded-solo rounds
          </span>
        )}
        {fund.topSectors.map((sector) => (
          <span
            className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs"
            key={sector.name}
          >
            {sector.name} · {sector.companyCount}
          </span>
        ))}
        {fund.roundStages.slice(0, 5).map((stage) => (
          <span
            className="rounded-full border border-white/10 px-2 py-0.5 text-xs capitalize"
            key={stage}
          >
            {stage.replaceAll('-', ' ')}
          </span>
        ))}
        {fund.jobCount > 0 && (
          <span className="text-emerald-300/80">
            {fund.jobCount.toLocaleString()} open jobs
          </span>
        )}
      </div>
    </div>
  );

  return (
    <CardWrapper id={fund.normalizedName} idAtom={activeFundSlugAtom}>
      <Link
        href={`/funds/${encodeURIComponent(fund.normalizedName)}${
          detailQuery ? `?${detailQuery}` : ''
        }`}
      >
        {content}
      </Link>
    </CardWrapper>
  );
};
