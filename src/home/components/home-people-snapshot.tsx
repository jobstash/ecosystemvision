'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';

import { HREFS } from '@/shared/core/constants';

import { getPeopleOverview } from '@/people/data/get-people';
import { PeoplePulseChart } from '@/people/components/people-pulse-chart';

export const HomePeopleSnapshot = () => {
  const overview = useQuery({
    queryKey: ['home-people-overview', 'quarter'],
    queryFn: () => getPeopleOverview('quarter'),
  });
  const latest = overview.data?.points.at(-1);

  return (
    <section
      aria-labelledby="people-snapshot-heading"
      className="border-t border-white/10 pt-16 lg:pt-24"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
            People pulse
          </p>
          <h2
            className="mt-2 font-grotesk text-32 font-medium tracking-tight md:text-40"
            id="people-snapshot-heading"
          >
            Work history makes ecosystem change visible.
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/50 md:text-base">
            Canonical internal contributors are counted once per month.
            Maintainers are the employees who merge pull requests; active leads
            are the maintainers still merging recently.
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-2 text-sm text-emerald-100 transition hover:text-white"
          href={HREFS.PEOPLE_PAGE}
        >
          Open the full People view
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <SnapshotMetric label="Active internal people" value={latest?.activePeople} />
        <SnapshotMetric label="Maintainers" value={latest?.activeMaintainers} />
        <SnapshotMetric label="Active organizations" value={latest?.activeOrganizations} />
      </div>
      <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3 md:p-5">
        {overview.data ? (
          <PeoplePulseChart overview={overview.data} />
        ) : (
          <div className="flex h-[320px] items-center justify-center text-sm text-white/40">
            Loading ecosystem activity…
          </div>
        )}
      </div>
    </section>
  );
};

const SnapshotMetric = ({
  label,
  value,
}: {
  label: string;
  value?: number;
}) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
    <p className="text-3xl font-medium tabular-nums text-white">
      {value?.toLocaleString() ?? '—'}
    </p>
    <p className="mt-1 text-xs text-white/40">{label}</p>
  </div>
);
