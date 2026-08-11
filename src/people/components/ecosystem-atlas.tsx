'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { scaleLinear, scaleTime } from 'd3-scale';

import { PeopleAtlas, PeopleAtlasNode } from '@/people/core/schemas';

interface Props {
  atlas: PeopleAtlas;
  selectedOrganizationKey?: string;
  onSelect: (node: PeopleAtlasNode) => void;
}

const LABEL_WIDTH = 270;
const TOP = 52;
const ROW_HEIGHT = 46;
const RIGHT = 24;

export const EcosystemAtlas = ({
  atlas,
  selectedOrganizationKey,
  onSelect,
}: Props) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1100);
  const [hoveredFlow, setHoveredFlow] =
    useState<PeopleAtlas['flows'][number]>();

  useEffect(() => {
    if (!hostRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(680, Math.floor(entry.contentRect.width)));
    });
    observer.observe(hostRef.current);
    return () => observer.disconnect();
  }, []);

  const organizations = atlas.organizations;
  const positions = useMemo(
    () =>
      new Map(
        organizations.map((organization, index) => [
          organization.organizationKey,
          TOP + index * ROW_HEIGHT + ROW_HEIGHT / 2,
        ]),
      ),
    [organizations],
  );
  const names = useMemo(
    () =>
      new Map(
        organizations.map((organization) => [
          organization.organizationKey,
          organization.organizationName,
        ]),
      ),
    [organizations],
  );
  const periods = useMemo(
    () => monthRange(atlas.fromPeriod, atlas.toPeriod),
    [atlas.fromPeriod, atlas.toPeriod],
  );
  const chartStart = Math.min(LABEL_WIDTH, width - 260);
  const x = useMemo(
    () =>
      scaleTime()
        .domain([
          new Date(`${atlas.fromPeriod ?? '2008-01-01'}T00:00:00Z`),
          new Date(`${atlas.toPeriod ?? '2008-02-01'}T00:00:00Z`),
        ])
        .range([chartStart + 12, width - RIGHT]),
    [atlas.fromPeriod, atlas.toPeriod, chartStart, width],
  );
  const maximumActivity = Math.max(
    1,
    ...organizations.flatMap((organization) =>
      organization.series.map((point) => point.activePeople),
    ),
  );
  const activityOpacity = scaleLinear()
    .domain([0, maximumActivity])
    .range([0.025, 0.42])
    .clamp(true);
  const maximumFlow = Math.max(1, ...atlas.flows.map((flow) => flow.people));
  const flowWidth = scaleLinear()
    .domain([1, maximumFlow])
    .range([1.25, 7])
    .clamp(true);
  const height = TOP + organizations.length * ROW_HEIGHT + 22;
  const tickEvery = width < 900 ? 12 : 6;

  if (!atlas.available) {
    return <Empty text="The movement timeline is being materialized." />;
  }
  if (!organizations.length) {
    return <Empty text="No organization movements exist in this window." />;
  }

  return (
    <div
      ref={hostRef}
      className="overflow-x-auto rounded-2xl border border-white/10 bg-[#090b0f]"
    >
      <div className="flex min-h-12 items-center justify-between gap-4 border-b border-white/10 px-4 py-2 text-xs">
        <p className="min-w-0 truncate text-white/65">
          {hoveredFlow ? (
            <>
              {names.get(hoveredFlow.sourceOrganizationKey)} →{' '}
              {names.get(hoveredFlow.destinationOrganizationKey)} ·{' '}
              {formatPeriod(hoveredFlow.period)} ·{' '}
              {hoveredFlow.people.toLocaleString()} people
            </>
          ) : (
            <>
              Time runs left to right. Each arrow is a confirmed move; lane
              intensity is active internal people.
            </>
          )}
        </p>
        <p className="shrink-0 tabular-nums text-white/35">
          {atlas.visibleMovements.toLocaleString()} of{' '}
          {atlas.totalMovements.toLocaleString()} moves visible
        </p>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`Organization movement timeline from ${atlas.fromPeriod} through ${atlas.toPeriod}`}
      >
        <defs>
          <marker
            id="flow-arrow-neutral"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#8da2ff" />
          </marker>
          <marker
            id="flow-arrow-in"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#59e1b7" />
          </marker>
          <marker
            id="flow-arrow-out"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#f4ba77" />
          </marker>
        </defs>

        {periods.map((period, index) => {
          const monthX = x(new Date(`${period}T00:00:00Z`));
          const next = periods[index + 1];
          const nextX = next ? x(new Date(`${next}T00:00:00Z`)) : width - RIGHT;
          return (
            <g key={period}>
              {index % tickEvery === 0 ? (
                <>
                  <line
                    x1={monthX}
                    x2={monthX}
                    y1={TOP - 8}
                    y2={height - 12}
                    stroke="rgba(255,255,255,0.09)"
                  />
                  <text
                    x={monthX + 3}
                    y={24}
                    fill="rgba(255,255,255,0.42)"
                    fontSize="10"
                  >
                    {formatPeriod(period, true)}
                  </text>
                </>
              ) : null}
              {organizations.map((organization, organizationIndex) => {
                const value = organization.series.find(
                  (point) => point.period === period,
                )?.activePeople;
                return (
                  <rect
                    key={organization.organizationKey}
                    x={monthX}
                    y={TOP + organizationIndex * ROW_HEIGHT + 6}
                    width={Math.max(1, nextX - monthX)}
                    height={ROW_HEIGHT - 12}
                    fill={`rgba(89,225,183,${activityOpacity(value ?? 0)})`}
                  />
                );
              })}
            </g>
          );
        })}

        {organizations.map((organization, index) => {
          const y = TOP + index * ROW_HEIGHT + ROW_HEIGHT / 2;
          const selected =
            organization.organizationKey === selectedOrganizationKey;
          return (
            <g
              key={organization.organizationKey}
              className="cursor-pointer"
              onClick={() => onSelect(organization)}
            >
              <line
                x1={chartStart}
                x2={width - RIGHT}
                y1={TOP + (index + 1) * ROW_HEIGHT}
                y2={TOP + (index + 1) * ROW_HEIGHT}
                stroke="rgba(255,255,255,0.055)"
              />
              <rect
                x="0"
                y={TOP + index * ROW_HEIGHT}
                width={chartStart}
                height={ROW_HEIGHT}
                fill={selected ? 'rgba(255,255,255,0.08)' : '#0d0f13'}
              />
              {organization.logoUrl ? (
                <image
                  href={organization.logoUrl}
                  x="10"
                  y={y - 14}
                  width="28"
                  height="28"
                  preserveAspectRatio="xMidYMid slice"
                />
              ) : (
                <circle cx="24" cy={y} r="14" fill="rgba(255,255,255,0.08)" />
              )}
              <foreignObject
                x="46"
                y={y - 18}
                width={chartStart - 54}
                height="36"
              >
                <div className="flex h-full items-center justify-between gap-2 text-[11px] text-white/80">
                  <span className="line-clamp-2 leading-4">
                    {organization.organizationName}
                  </span>
                  <span className="shrink-0 tabular-nums text-white/40">
                    {organization.activePeople.toLocaleString()}
                  </span>
                </div>
              </foreignObject>
              <title>
                {organization.organizationName} ·{' '}
                {organization.activePeople.toLocaleString()} active people ·{' '}
                {organization.activeMaintainers.toLocaleString()} maintainers
              </title>
            </g>
          );
        })}

        {atlas.flows.map((flow, index) => {
          const sourceY = positions.get(flow.sourceOrganizationKey);
          const targetY = positions.get(flow.destinationOrganizationKey);
          if (sourceY === undefined || targetY === undefined) return null;
          const end = x(new Date(`${flow.period}T00:00:00Z`));
          const startDate = new Date(`${flow.period}T00:00:00Z`);
          startDate.setUTCMonth(startDate.getUTCMonth() - 1);
          const start = Math.max(chartStart + 4, x(startDate));
          const middle = (start + end) / 2;
          const direction =
            selectedOrganizationKey === flow.destinationOrganizationKey
              ? 'in'
              : selectedOrganizationKey === flow.sourceOrganizationKey
                ? 'out'
                : 'neutral';
          const color = {
            in: '#59e1b7',
            out: '#f4ba77',
            neutral: '#8da2ff',
          }[direction];
          return (
            <path
              key={`${flow.period}:${flow.sourceOrganizationKey}:${flow.destinationOrganizationKey}:${index}`}
              d={`M ${start} ${sourceY} C ${middle} ${sourceY}, ${middle} ${targetY}, ${end} ${targetY}`}
              fill="none"
              stroke={color}
              strokeOpacity={hoveredFlow === flow ? 0.95 : 0.5}
              strokeWidth={flowWidth(flow.people)}
              markerEnd={`url(#flow-arrow-${direction})`}
              className="cursor-crosshair transition-opacity"
              onMouseEnter={() => setHoveredFlow(flow)}
              onMouseLeave={() => setHoveredFlow(undefined)}
            >
              <title>
                {names.get(flow.sourceOrganizationKey)} to{' '}
                {names.get(flow.destinationOrganizationKey)} ·{' '}
                {flow.people.toLocaleString()} people in{' '}
                {formatPeriod(flow.period)}
              </title>
            </path>
          );
        })}
      </svg>
    </div>
  );
};

const monthRange = (from: string | null, to: string | null) => {
  if (!from || !to) return [];
  const start = new Date(`${from}T00:00:00Z`);
  const end = new Date(`${to}T00:00:00Z`);
  const values: string[] = [];
  while (start <= end) {
    values.push(start.toISOString().slice(0, 10));
    start.setUTCMonth(start.getUTCMonth() + 1);
  }
  return values;
};

const formatPeriod = (value: string, short = false) =>
  new Intl.DateTimeFormat('en', {
    month: short ? 'short' : 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));

const Empty = ({ text }: { text: string }) => (
  <div className="flex h-[420px] items-center justify-center rounded-2xl border border-white/10 text-sm text-white/45">
    {text}
  </div>
);
