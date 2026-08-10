'use client';

import Image from 'next/image';
import { useMemo, useRef } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';
import { scaleSqrt } from 'd3-scale';

import { cn } from '@/shared/utils/cn';

import {
  PeopleActivityMap,
  PeopleActivityMapRow,
} from '@/people/core/schemas';

const LABEL_WIDTH = 248;
const CELL_WIDTH = 28;
const ROW_HEIGHT = 44;

interface Props {
  data: PeopleActivityMap;
  selectedOrganizationKey?: string;
  onSelect: (row: PeopleActivityMapRow) => void;
  onPageChange: (page: number) => void;
}

export const PeopleActivityMapView = ({
  data,
  selectedOrganizationKey,
  onSelect,
  onPageChange,
}: Props) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const periods = useMemo(
    () =>
      Array.from(
        new Set(data.rows.flatMap((row) => row.series.map((point) => point.period))),
      ).sort(),
    [data.rows],
  );
  const maximum = useMemo(
    () =>
      Math.max(
        1,
        ...data.rows.flatMap((row) => row.series.map((point) => point.value)),
      ),
    [data.rows],
  );
  const color = useMemo(
    () =>
      scaleSqrt<string>()
        .domain([0, maximum * 0.2, maximum])
        .range(['rgba(84,227,181,0.03)', '#236f63', '#8ff8d1'])
        .clamp(true),
    [maximum],
  );
  const virtualizer = useVirtualizer({
    count: data.rows.length,
    getScrollElement: () => viewportRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
  });
  const gridWidth = LABEL_WIDTH + periods.length * CELL_WIDTH;

  if (!data.available) {
    return <Empty text="The organization activity map is being materialized." />;
  }
  if (!data.rows.length) {
    return <Empty text="No organizations match this view." />;
  }

  return (
    <div>
      <div
        ref={viewportRef}
        className="h-[620px] overflow-auto rounded-2xl border border-white/10 bg-[#0d0f13]"
      >
        <div style={{ width: gridWidth }}>
          <div className="sticky top-0 z-30 flex h-10 border-b border-white/10 bg-[#111319]">
            <div
              className="sticky left-0 z-40 flex shrink-0 items-center border-r border-white/10 bg-[#111319] px-3 text-xs font-medium text-white/60"
              style={{ width: LABEL_WIDTH }}
            >
              Organization
            </div>
            {periods.map((period, index) => (
              <div
                key={period}
                className="flex shrink-0 items-center justify-center border-r border-white/[0.04] text-10 text-white/35"
                style={{ width: CELL_WIDTH }}
                title={period}
              >
                {index % 12 === 0 ? period.slice(0, 4) : ''}
              </div>
            ))}
          </div>
          <div
            className="relative"
            style={{ height: virtualizer.getTotalSize() }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const row = data.rows[virtualRow.index];
              const values = new Map(
                row.series.map((point) => [point.period, point.value]),
              );
              const selected = row.organizationKey === selectedOrganizationKey;
              return (
                <div
                  key={row.organizationKey}
                  className={cn(
                    'absolute left-0 flex border-b border-white/[0.04]',
                    selected && 'bg-white/[0.06]',
                  )}
                  style={{
                    height: ROW_HEIGHT,
                    transform: `translateY(${virtualRow.start}px)`,
                    width: gridWidth,
                  }}
                >
                  <button
                    type="button"
                    className="sticky left-0 z-20 flex shrink-0 items-center gap-2 border-r border-white/10 bg-[#0d0f13] px-3 text-left transition hover:bg-[#181b22]"
                    style={{ width: LABEL_WIDTH }}
                    onClick={() => onSelect(row)}
                  >
                    <OrganizationLogo
                      name={row.organizationName}
                      logoUrl={row.logoUrl}
                    />
                    <span className="min-w-0 grow truncate text-xs text-white/80">
                      {row.organizationName}
                    </span>
                    <span className="text-xs tabular-nums text-white/45">
                      {row.currentValue.toLocaleString()}
                    </span>
                  </button>
                  {periods.map((period) => {
                    const value = values.get(period) ?? 0;
                    return (
                      <button
                        type="button"
                        key={period}
                        aria-label={`${row.organizationName}, ${period}: ${value.toLocaleString()}`}
                        className="shrink-0 border-r border-white/[0.035] transition hover:outline hover:outline-1 hover:outline-white/70"
                        style={{
                          width: CELL_WIDTH,
                          backgroundColor: color(value),
                        }}
                        title={`${row.organizationName} · ${period} · ${value.toLocaleString()}`}
                        onClick={() => onSelect(row)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <button
          type="button"
          className="rounded-lg border border-white/10 px-3 py-2 text-white/70 disabled:opacity-30"
          disabled={data.page <= 1}
          onClick={() => onPageChange(data.page - 1)}
        >
          Previous organizations
        </button>
        <span className="text-xs text-white/45">
          Page {data.page} · {data.total.toLocaleString()} organizations
        </span>
        <button
          type="button"
          className="rounded-lg border border-white/10 px-3 py-2 text-white/70 disabled:opacity-30"
          disabled={data.page * data.limit >= data.total}
          onClick={() => onPageChange(data.page + 1)}
        >
          Next organizations
        </button>
      </div>
    </div>
  );
};

const OrganizationLogo = ({
  logoUrl,
  name,
}: {
  logoUrl: string | null;
  name: string;
}) =>
  logoUrl ? (
    <Image
      unoptimized
      src={logoUrl}
      alt=""
      width={24}
      height={24}
      className="size-6 rounded-md bg-white/5 object-cover"
    />
  ) : (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white/10 text-10 text-white/60">
      {name.slice(0, 1).toUpperCase()}
    </span>
  );

const Empty = ({ text }: { text: string }) => (
  <div className="flex h-[420px] items-center justify-center rounded-2xl border border-white/10 text-sm text-white/45">
    {text}
  </div>
);
