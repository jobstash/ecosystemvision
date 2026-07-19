'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import {
  ArrowDownWideNarrowIcon,
  ArrowUpWideNarrowIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';

import { QUERY_STALETIME } from '@/shared/core/constants';

import { fundQueryKeys } from '@/funds/core/query-keys';
import { getFundRoundStages } from '@/funds/data/get-fund-round-stages';
import { getFundSectors } from '@/funds/data/get-fund-sectors';

const inputClass =
  'h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-white outline-none transition placeholder:text-white/35 hover:border-white/25 focus:border-white/40';

const selectParams = (
  searchParams: URLSearchParams,
  keys: string[],
): Record<string, string> =>
  Object.fromEntries(
    keys.flatMap((key) => {
      const value = searchParams.get(key);
      return value ? [[key, value]] : [];
    }),
  );

const formatLocalDate = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');

const defaultCustomRange = () => {
  const now = new Date();
  const toDate = formatLocalDate(now);
  now.setFullYear(now.getFullYear() - 1);
  return { fromDate: formatLocalDate(now), toDate };
};

export const FundFilters = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const roundDetailsRef = useRef<HTMLDetailsElement>(null);
  const sectorParams = selectParams(new URLSearchParams(searchParams.toString()), [
    'activityWindow',
    'fromDate',
    'toDate',
    'rounds',
  ]);
  const roundParams = selectParams(new URLSearchParams(searchParams.toString()), [
    'activityWindow',
    'fromDate',
    'toDate',
    'sector',
  ]);
  const sectors = useQuery({
    queryKey: fundQueryKeys.sectors(sectorParams),
    queryFn: () => getFundSectors(sectorParams),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
  const roundStages = useQuery({
    queryKey: fundQueryKeys.rounds(roundParams),
    queryFn: () => getFundRoundStages(roundParams),
    staleTime: QUERY_STALETIME.DEFAULT,
  });

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    next.delete('page');
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) next.delete(key);
      else next.set(key, value);
    });
    router.push(`${pathname}${next.size ? `?${next.toString()}` : ''}`);
  };

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    updateParams({ query: String(form.get('query') ?? '').trim() || null });
  };

  const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc';
  const requestedOrderBy = searchParams.get('orderBy');
  const activityWindow = searchParams.get('activityWindow') ?? '1y';
  const selectedRounds = (searchParams.get('rounds') ?? '')
    .split(',')
    .filter(Boolean);
  const orderBy =
    requestedOrderBy === 'knownRoundCapital' ||
    requestedOrderBy === 'progressionRate' ||
    requestedOrderBy === 'medianRoundSizeStepUp' ||
    requestedOrderBy === 'medianValuationStepUp' ||
    requestedOrderBy === 'soloRate' ||
    requestedOrderBy === 'portfolioCount' ||
    requestedOrderBy === 'staffCount' ||
    requestedOrderBy === 'name'
      ? requestedOrderBy
      : 'lastInvestmentDate';
  const hasFilters = searchParams.size > 0;

  return (
    <div className="xl:flex-row xl:items-center xl:justify-between flex flex-col gap-3 rounded-2xl border border-white/15 p-3">
      <form className="relative min-w-64 flex-1" onSubmit={onSearch}>
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 text-white/40"
          size={16}
        />
        <input
          aria-label="Search funds"
          className={`${inputClass} w-full pl-9`}
          defaultValue={searchParams.get('query') ?? ''}
          key={searchParams.get('query') ?? ''}
          name="query"
          placeholder="Search funds"
          type="search"
        />
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <select
          aria-label="Fund activity period"
          className={inputClass}
          onChange={(event) => {
            if (event.target.value === 'custom') {
              const range = defaultCustomRange();
              updateParams({ activityWindow: 'custom', ...range });
              return;
            }
            updateParams({
              activityWindow:
                event.target.value === '1y' ? null : event.target.value,
              fromDate: null,
              toDate: null,
            });
          }}
          value={activityWindow}
        >
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="6m">Last 6 months</option>
          <option value="1y">Last 12 months</option>
          <option value="2y">Last 2 years</option>
          <option value="5y">Last 5 years</option>
          <option value="all">All time</option>
          <option value="custom">Custom dates</option>
        </select>

        {activityWindow === 'custom' && (
          <>
            <input
              aria-label="Activity start date"
              className={inputClass}
              max={searchParams.get('toDate') ?? undefined}
              onChange={(event) =>
                updateParams({ fromDate: event.target.value || null })
              }
              type="date"
              value={searchParams.get('fromDate') ?? ''}
            />
            <span className="text-sm text-white/40">to</span>
            <input
              aria-label="Activity end date"
              className={inputClass}
              min={searchParams.get('fromDate') ?? undefined}
              onChange={(event) =>
                updateParams({ toDate: event.target.value || null })
              }
              type="date"
              value={searchParams.get('toDate') ?? ''}
            />
          </>
        )}

        <details className="group relative" ref={roundDetailsRef}>
          <summary
            className={`${inputClass} flex cursor-pointer list-none items-center gap-2`}
          >
            {selectedRounds.length > 0
              ? `Rounds (${selectedRounds.length})`
              : 'Any round'}
          </summary>
          <div className="absolute right-0 z-30 mt-2 max-h-80 min-w-72 overflow-y-auto rounded-xl border border-white/15 bg-[#111113] p-2 shadow-2xl">
            {roundStages.isPending && (
              <p className="px-3 py-2 text-sm text-white/45">
                Loading round stages…
              </p>
            )}
            {roundStages.isError && (
              <p className="px-3 py-2 text-sm text-rose-300/70">
                Round stages unavailable
              </p>
            )}
            {roundStages.data?.map((stage) => (
              <label
                className="flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-white/[0.06]"
                key={stage.slug}
              >
                <input
                  checked={selectedRounds.includes(stage.slug)}
                  className="mt-1 accent-white"
                  onChange={() => {
                    const next = new Set(selectedRounds);
                    if (next.has(stage.slug)) next.delete(stage.slug);
                    else next.add(stage.slug);
                    roundDetailsRef.current?.removeAttribute('open');
                    updateParams({
                      rounds: next.size ? [...next].join(',') : null,
                    });
                  }}
                  type="checkbox"
                />
                <span className="flex-1">
                  <span className="block text-white/80">{stage.name}</span>
                  <span className="text-xs text-white/40">
                    {stage.fundCount.toLocaleString()} funds ·{' '}
                    {stage.investmentCount.toLocaleString()} investments
                  </span>
                </span>
              </label>
            ))}
          </div>
        </details>

        <select
          aria-label="Sort funds by"
          className={inputClass}
          onChange={(event) =>
            updateParams({
              orderBy:
                event.target.value === 'lastInvestmentDate'
                  ? null
                  : event.target.value,
            })
          }
          value={orderBy}
        >
          <option value="lastInvestmentDate">Last investment</option>
          <option value="knownRoundCapital">Disclosed round capital</option>
          <option value="progressionRate">Portfolio progression</option>
          <option value="medianRoundSizeStepUp">Round-size step-up</option>
          <option value="medianValuationStepUp">Valuation step-up</option>
          <option value="soloRate">Recorded-solo rate</option>
          <option value="portfolioCount">Portfolio size</option>
          <option value="staffCount">Team size</option>
          <option value="name">Name</option>
        </select>

        <button
          aria-label={`Sort ${order === 'desc' ? 'ascending' : 'descending'}`}
          className={`${inputClass} inline-flex items-center gap-2`}
          onClick={() =>
            updateParams({ order: order === 'desc' ? 'asc' : null })
          }
          type="button"
        >
          {order === 'desc' ? (
            <ArrowDownWideNarrowIcon size={16} />
          ) : (
            <ArrowUpWideNarrowIcon size={16} />
          )}
          {order === 'desc' ? 'Descending' : 'Ascending'}
        </button>

        <select
          aria-label="Minimum disclosed round capital"
          className={inputClass}
          onChange={(event) =>
            updateParams({ minKnownRoundCapital: event.target.value || null })
          }
          value={searchParams.get('minKnownRoundCapital') ?? ''}
        >
          <option value="">Any round capital</option>
          <option value="10000000">$10M+ round capital</option>
          <option value="100000000">$100M+ round capital</option>
          <option value="1000000000">$1B+ round capital</option>
          <option value="10000000000">$10B+ round capital</option>
        </select>

        <select
          aria-label="Minimum portfolio size"
          className={inputClass}
          onChange={(event) =>
            updateParams({ minPortfolioCount: event.target.value || null })
          }
          value={searchParams.get('minPortfolioCount') ?? ''}
        >
          <option value="">Any portfolio</option>
          <option value="5">5+ companies</option>
          <option value="10">10+ companies</option>
          <option value="25">25+ companies</option>
          <option value="50">50+ companies</option>
        </select>

        <select
          aria-label="Minimum portfolio progression"
          className={inputClass}
          onChange={(event) =>
            updateParams({ minProgressionRate: event.target.value || null })
          }
          value={searchParams.get('minProgressionRate') ?? ''}
        >
          <option value="">Any progression</option>
          <option value="25">25%+ progressed</option>
          <option value="50">50%+ progressed</option>
          <option value="75">75%+ progressed</option>
        </select>

        <select
          aria-label="Portfolio sector"
          className={inputClass}
          disabled={sectors.isPending || sectors.isError}
          onChange={(event) =>
            updateParams({ sector: event.target.value || null })
          }
          value={searchParams.get('sector') ?? ''}
        >
          <option value="">
            {sectors.isPending ? 'Loading sectors…' : 'Any sector'}
          </option>
          {sectors.data?.map((sector) => (
            <option key={sector.name} value={sector.name}>
              {sector.name} ({sector.companyCount.toLocaleString()})
            </option>
          ))}
        </select>

        <button
          aria-pressed={searchParams.get('hasJobs') === 'true'}
          className={`${inputClass} ${
            searchParams.get('hasJobs') === 'true'
              ? 'border-emerald-300/50 bg-emerald-300/10 text-emerald-200'
              : ''
          }`}
          onClick={() =>
            updateParams({
              hasJobs:
                searchParams.get('hasJobs') === 'true' ? null : 'true',
            })
          }
          type="button"
        >
          Open jobs
        </button>

        <button
          aria-pressed={searchParams.get('hasSoloInvestments') === 'true'}
          className={`${inputClass} ${
            searchParams.get('hasSoloInvestments') === 'true'
              ? 'border-violet-300/50 bg-violet-300/10 text-violet-200'
              : ''
          }`}
          onClick={() =>
            updateParams({
              hasSoloInvestments:
                searchParams.get('hasSoloInvestments') === 'true'
                  ? null
                  : 'true',
            })
          }
          type="button"
        >
          Recorded solo
        </button>

        <button
          aria-pressed={searchParams.get('hasTeamSocials') === 'true'}
          className={`${inputClass} ${
            searchParams.get('hasTeamSocials') === 'true'
              ? 'border-sky-300/50 bg-sky-300/10 text-sky-200'
              : ''
          }`}
          onClick={() =>
            updateParams({
              hasTeamSocials:
                searchParams.get('hasTeamSocials') === 'true' ? null : 'true',
            })
          }
          type="button"
        >
          Team socials
        </button>

        {hasFilters && (
          <button
            aria-label="Clear fund filters"
            className={`${inputClass} inline-flex items-center gap-2`}
            onClick={() => router.push(pathname)}
            type="button"
          >
            <XIcon size={15} /> Clear
          </button>
        )}
      </div>
    </div>
  );
};
