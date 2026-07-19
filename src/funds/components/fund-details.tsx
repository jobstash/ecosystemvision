'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
  ArrowLeftIcon,
  BriefcaseBusinessIcon,
  CalendarClockIcon,
  ExternalLinkIcon,
  LinkedinIcon,
  MapPinIcon,
  TwitterIcon,
  UsersIcon,
  WalletIcon,
} from 'lucide-react';

import { formatNumber } from '@/shared/utils/format-number';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { shortTimestamp } from '@/shared/utils/short-timestamp';
import { CompactJobCard } from '@/shared/components/compact-job-card';
import { LogoTitle } from '@/shared/components/logo-title';

import type {
  FundDetails as FundDetailsData,
  FundInvestment,
  FundTeamMember,
} from '@/funds/core/schemas';

const externalLinkClass =
  'inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition hover:border-white/35 hover:text-white';
const INVESTMENT_PAGE_SIZE = 24;

const TeamMember = ({ member }: { member: FundTeamMember }) => (
  <article className="flex min-h-28 items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
    <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 text-lg font-semibold text-white/70">
      {member.name.slice(0, 1).toUpperCase()}
      {member.photoUrl && (
        <div
          aria-label={`${member.name} portrait`}
          className="absolute inset-0 bg-cover bg-center"
          role="img"
          style={{
            backgroundImage: `url(${JSON.stringify(member.photoUrl).slice(1, -1)})`,
          }}
        />
      )}
    </div>
    <div className="min-w-0 space-y-2">
      <div>
        <h3 className="font-medium text-white">{member.name}</h3>
        {member.jobTitle && (
          <p className="mt-1 text-sm leading-5 text-white/55">
            {member.jobTitle}
          </p>
        )}
      </div>
      <div className="flex gap-3 text-white/55">
        {member.linkedinUrl && (
          <Link
            aria-label={`${member.name} on LinkedIn`}
            href={member.linkedinUrl}
            rel="noreferrer"
            target="_blank"
          >
            <LinkedinIcon size={16} />
          </Link>
        )}
        {member.twitterUrl && (
          <Link
            aria-label={`${member.name} on X`}
            href={member.twitterUrl}
            rel="noreferrer"
            target="_blank"
          >
            <TwitterIcon size={16} />
          </Link>
        )}
      </div>
    </div>
  </article>
);

const Investment = ({ investment }: { investment: FundInvestment }) => (
  <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <Link
        className="min-w-0 transition hover:opacity-80"
        href={`/organizations/info/${encodeURIComponent(investment.normalizedName)}`}
      >
        <LogoTitle
          name={investment.name}
          src={getLogoUrl(investment.website ?? '', investment.logoUrl)}
        />
      </Link>
      {investment.vertical && (
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs capitalize text-white/60">
          {investment.vertical.replaceAll('_', ' ')}
        </span>
      )}
    </div>
    {investment.summary && (
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/55">
        {investment.summary}
      </p>
    )}
    <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
      {investment.rounds
        .slice()
        .sort((a, b) => b.date - a.date)
        .map((round) => (
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/55"
            key={round.id}
          >
            <span className="font-medium text-white/75">{round.roundName}</span>
            {round.date > 0 && <span>{shortTimestamp(round.date)}</span>}
            {round.raisedAmount > 0 && (
              <span>
                $
                {formatNumber(
                  round.source
                    ? round.raisedAmount
                    : round.raisedAmount * 1_000_000,
                )}{' '}
                round
              </span>
            )}
            {round.sourceLink && (
              <Link
                aria-label={`Source for ${investment.name} ${round.roundName}`}
                href={round.sourceLink}
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLinkIcon size={13} />
              </Link>
            )}
          </div>
        ))}
    </div>
  </article>
);

export const FundDetails = ({ fund }: { fund: FundDetailsData }) => {
  const [visibleInvestmentCount, setVisibleInvestmentCount] =
    useState(INVESTMENT_PAGE_SIZE);
  const website = fund.website ?? '';
  const visibleInvestments = fund.investments.slice(0, visibleInvestmentCount);
  return (
    <main className="glow-gradient min-h-screen px-4 pb-16 pt-24 md:px-8 lg:pt-12">
      <div className="mx-auto max-w-6xl space-y-12">
        <Link
          className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
          href="/funds"
        >
          <ArrowLeftIcon size={16} />
          All funds
        </Link>

        <header className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="space-y-5">
              <LogoTitle
                src={getLogoUrl(website, fund.logoUrl)}
                name={fund.name}
              >
                <h1 className="text-3xl font-semibold text-white md:text-4xl">
                  {fund.name}
                </h1>
              </LogoTitle>
              {(fund.description || fund.summary) && (
                <p className="max-w-3xl whitespace-pre-line leading-7 text-white/65">
                  {fund.description || fund.summary}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                {website && (
                  <Link
                    className={externalLinkClass}
                    href={website}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Website <ExternalLinkIcon size={15} />
                  </Link>
                )}
                {fund.twitter && (
                  <Link
                    className={externalLinkClass}
                    href={
                      fund.twitter.startsWith('http')
                        ? fund.twitter
                        : `https://x.com/${fund.twitter.replace(/^@/, '')}`
                    }
                    rel="noreferrer"
                    target="_blank"
                  >
                    <TwitterIcon size={15} /> X
                  </Link>
                )}
              </div>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/5 p-4">
                <WalletIcon className="mb-3 text-white/50" size={18} />
                <strong className="block text-xl text-white">
                  ${formatNumber(fund.totalInvestedCapital)}
                </strong>
                <span className="text-white/50">invested capital</span>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <CalendarClockIcon
                  className="mb-3 text-white/50"
                  size={18}
                />
                <strong className="block text-base text-white">
                  {fund.lastInvestmentDate
                    ? shortTimestamp(fund.lastInvestmentDate)
                    : 'Not available'}
                </strong>
                <span className="text-white/50">last investment</span>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <BriefcaseBusinessIcon
                  className="mb-3 text-white/50"
                  size={18}
                />
                <strong className="block text-xl text-white">
                  {fund.portfolioCount.toLocaleString()}
                </strong>
                <span className="text-white/50">investments</span>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <UsersIcon className="mb-3 text-white/50" size={18} />
                <strong className="block text-xl text-white">
                  {fund.staffCount.toLocaleString()}
                </strong>
                <span className="text-white/50">team members</span>
              </div>
            </div>
          </div>
          {fund.location && (
            <p className="mt-6 flex items-center gap-2 text-sm text-white/45">
              <MapPinIcon size={15} /> {fund.location}
            </p>
          )}
        </header>

        {fund.jobs.length > 0 && (
          <section className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/35">
                Opportunities
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Open jobs across the portfolio
              </h2>
              <p className="mt-2 text-sm text-white/45">
                {fund.jobCount.toLocaleString()} current roles at companies backed
                by {fund.name}.
              </p>
            </div>
            <div className="grid gap-2 lg:grid-cols-2">
              {fund.jobs.map((job) => (
                <CompactJobCard job={job} key={job.id} />
              ))}
            </div>
          </section>
        )}

        <section className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/35">
              People
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Team</h2>
          </div>
          {fund.team.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fund.team.map((member) => (
                <TeamMember key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-white/10 p-6 text-white/45">
              No team details are available yet.
            </p>
          )}
        </section>

        <section className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/35">
              Portfolio
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Investments
            </h2>
            <p className="mt-2 text-sm text-white/45">
              Financing rounds in which {fund.name} is recorded as an investor.
            </p>
          </div>
          {fund.investments.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {visibleInvestments.map((investment) => (
                <Investment
                  investment={investment}
                  key={investment.organizationId}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-white/10 p-6 text-white/45">
              No portfolio investments are available yet.
            </p>
          )}
          {visibleInvestmentCount < fund.investments.length && (
            <div className="flex justify-center pt-2">
              <button
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/70 transition hover:border-white/35 hover:bg-white/5 hover:text-white"
                onClick={() =>
                  setVisibleInvestmentCount((count) =>
                    Math.min(
                      count + INVESTMENT_PAGE_SIZE,
                      fund.investments.length,
                    ),
                  )
                }
                type="button"
              >
                Show more investments ({visibleInvestmentCount.toLocaleString()}{' '}
                of {fund.investments.length.toLocaleString()})
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
