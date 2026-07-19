'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FormEvent } from 'react';

import { ArrowDownWideNarrowIcon, ArrowUpWideNarrowIcon, SearchIcon, XIcon } from 'lucide-react';

const inputClass =
  'h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-white outline-none transition placeholder:text-white/35 hover:border-white/25 focus:border-white/40';

export const FundFilters = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
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
          value={searchParams.get('orderBy') ?? 'lastInvestmentDate'}
        >
          <option value="lastInvestmentDate">Last investment</option>
          <option value="totalInvestedCapital">Invested capital</option>
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
          aria-label="Minimum invested capital"
          className={inputClass}
          onChange={(event) =>
            updateParams({ minInvestedCapital: event.target.value || null })
          }
          value={searchParams.get('minInvestedCapital') ?? ''}
        >
          <option value="">Any capital</option>
          <option value="10000000">$10M+ capital</option>
          <option value="50000000">$50M+ capital</option>
          <option value="100000000">$100M+ capital</option>
          <option value="500000000">$500M+ capital</option>
          <option value="1000000000">$1B+ capital</option>
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
