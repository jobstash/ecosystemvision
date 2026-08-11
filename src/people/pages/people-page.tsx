'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Grid3X3,
  Network,
  Search,
  Users,
} from 'lucide-react';

import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import {
  PeopleActivityMap,
  PeopleActivityMapRow,
  PeopleAtlas,
  PeopleAtlasNode,
  PeopleDirectory,
  PeopleMetric,
  PeopleOverview,
} from '@/people/core/schemas';
import { getPeopleActivityMap, getPeopleAtlas } from '@/people/data/get-people';

import { PeopleActivityMapView } from '../components/people-activity-map';
import { PeopleDirectory as PeopleDirectoryView } from '../components/people-directory';
import { PeoplePulseChart } from '../components/people-pulse-chart';
import { PersonDrawer } from '../components/person-drawer';

const EcosystemAtlas = dynamic(
  () =>
    import('../components/ecosystem-atlas').then(
      (module) => module.EcosystemAtlas,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[620px] items-center justify-center rounded-2xl border border-white/10 text-sm text-white/40">
        Loading movement timeline…
      </div>
    ),
  },
);

type View = 'activity-map' | 'atlas';
type SelectedOrganization = Pick<
  PeopleActivityMapRow,
  | 'organizationKey'
  | 'organizationId'
  | 'organizationName'
  | 'organizationSlug'
  | 'logoUrl'
> &
  Partial<Pick<PeopleAtlasNode, 'activePeople' | 'activeMaintainers'>>;

interface Props {
  initialOverview: PeopleOverview;
  initialActivityMap: PeopleActivityMap;
  initialAtlas: PeopleAtlas;
  initialDirectory: PeopleDirectory;
}

const METRICS: Array<{ value: PeopleMetric; label: string }> = [
  { value: 'activePeople', label: 'Active internal people' },
  { value: 'affiliatedPeople', label: 'All affiliations (non-additive)' },
  { value: 'activeMaintainers', label: 'Maintainers' },
  { value: 'activeLeads', label: 'Active leads' },
  { value: 'joins', label: 'Organization joins' },
  { value: 'exits', label: 'Organization exits' },
  { value: 'movements', label: 'Confirmed movements' },
  { value: 'activity', label: 'All internal activity' },
  { value: 'commits', label: 'Internal commits' },
  { value: 'merges', label: 'PR merges' },
];

export const PeoplePage = ({
  initialOverview,
  initialActivityMap,
  initialAtlas,
  initialDirectory,
}: Props) => {
  const [view, setView] = useState<View>('atlas');
  const [metric, setMetric] = useState<PeopleMetric>('activePeople');
  const [organizationQuery, setOrganizationQuery] = useState('');
  const debouncedOrganizationQuery = useDebouncedValue(
    organizationQuery.trim(),
    250,
  );
  const [page, setPage] = useState(1);
  const [selectedOrganization, setSelectedOrganization] =
    useState<SelectedOrganization>();
  const [selectedPerson, setSelectedPerson] = useState<string>();
  const periods = useMemo(
    () => initialOverview.points.map((point) => point.period),
    [initialOverview.points],
  );
  const [periodIndex, setPeriodIndex] = useState(
    Math.max(0, periods.length - 1),
  );
  const selectedPeriod = periods[periodIndex];

  useEffect(() => setPage(1), [metric, debouncedOrganizationQuery]);

  const activityMap = useQuery({
    queryKey: ['people-activity-map', metric, debouncedOrganizationQuery, page],
    queryFn: () =>
      getPeopleActivityMap({
        metric,
        query: debouncedOrganizationQuery || undefined,
        page,
      }),
    placeholderData: (previous) => previous,
    initialData:
      metric === 'activePeople' && !debouncedOrganizationQuery && page === 1
        ? initialActivityMap
        : undefined,
  });
  const atlas = useQuery({
    queryKey: [
      'people-atlas',
      selectedPeriod,
      selectedOrganization?.organizationKey,
    ],
    queryFn: () =>
      getPeopleAtlas({
        at: selectedPeriod,
        organizationKey: selectedOrganization?.organizationKey,
      }),
    placeholderData: (previous) => previous,
    initialData:
      initialAtlas.toPeriod === selectedPeriod && !selectedOrganization
        ? initialAtlas
        : undefined,
  });
  const latest = initialOverview.points.at(-1);

  const selectOrganization = (
    organization: PeopleActivityMapRow | PeopleAtlasNode,
  ) => {
    setSelectedOrganization(organization);
  };

  return (
    <main className="min-h-screen bg-[#070708] px-4 pb-24 pt-28 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <header className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/70">
            People
          </p>
          <h1 className="mt-3 font-grotesk text-4xl font-medium tracking-tight md:text-6xl">
            Watch an ecosystem form, grow, and move.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/55 md:text-lg">
            Explore the canonical internal employees behind open-source
            organizations, the maintainers who merge their work, and how those
            people move through the ecosystem over time.
          </p>
        </header>

        <section className="xl:grid-cols-4 mt-10 grid gap-3 sm:grid-cols-2">
          <HeadlineMetric
            icon={<Users className="size-4" />}
            label="Active internal people"
            value={latest?.activePeople}
          />
          <HeadlineMetric
            icon={<Building2 className="size-4" />}
            label="Active organizations"
            value={latest?.activeOrganizations}
          />
          <HeadlineMetric
            icon={<ArrowUpRight className="size-4" />}
            label="Joined this period"
            value={latest?.joins}
          />
          <HeadlineMetric
            icon={<ArrowDownRight className="size-4" />}
            label="Exited this period"
            value={latest?.exits}
          />
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-3 md:p-5">
          <PeoplePulseChart overview={initialOverview} />
        </section>

        <section className="mt-14" aria-labelledby="ecosystem-view-heading">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                Coordinated views
              </p>
              <h2
                id="ecosystem-view-heading"
                className="mt-1 font-grotesk text-2xl font-medium"
              >
                Ecosystem through time
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-white/45">
                Scrub through confirmed moves on fixed organization lanes, or
                inspect every organization as an exact monthly history.
              </p>
            </div>
            <div className="flex rounded-xl border border-white/10 bg-white/[0.025] p-1">
              <ViewButton
                isActive={view === 'activity-map'}
                icon={<Grid3X3 className="size-4" />}
                label="Organization history"
                onClick={() => setView('activity-map')}
              />
              <ViewButton
                isActive={view === 'atlas'}
                icon={<Network className="size-4" />}
                label="Movement flows"
                onClick={() => setView('atlas')}
              />
            </div>
          </div>

          {view === 'activity-map' ? (
            <>
              <div className="my-5 flex flex-col gap-3 md:flex-row">
                <label className="flex min-h-11 grow items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3">
                  <Search className="size-4 text-white/35" aria-hidden="true" />
                  <span className="sr-only">Search organizations</span>
                  <input
                    type="search"
                    value={organizationQuery}
                    onChange={(event) =>
                      setOrganizationQuery(event.target.value)
                    }
                    placeholder="Search all organizations"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                  />
                </label>
                <label className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 text-xs text-white/45">
                  Metric
                  <select
                    value={metric}
                    onChange={(event) =>
                      setMetric(event.target.value as PeopleMetric)
                    }
                    className="bg-transparent text-sm text-white outline-none"
                  >
                    {METRICS.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-[#111319]"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <PeopleActivityMapView
                data={activityMap.data ?? initialActivityMap}
                selectedOrganizationKey={selectedOrganization?.organizationKey}
                onSelect={selectOrganization}
                onPageChange={setPage}
              />
            </>
          ) : (
            <>
              <div className="my-5 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 md:flex-row md:items-center">
                <label className="grow text-xs text-white/45">
                  <span className="flex items-center justify-between">
                    <span>Timeline ends</span>
                    <span className="text-white/70">
                      {selectedPeriod ? formatPeriod(selectedPeriod) : 'Latest'}
                    </span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(0, periods.length - 1)}
                    value={periodIndex}
                    disabled={!periods.length}
                    onChange={(event) =>
                      setPeriodIndex(Number(event.target.value))
                    }
                    className="mt-2 w-full accent-emerald-300"
                  />
                </label>
                <p className="text-xs text-white/35 md:max-w-60">
                  The chart keeps organizations on fixed lanes and uses time
                  horizontally, so movement never depends on animated layout.
                </p>
              </div>
              <EcosystemAtlas
                atlas={atlas.data ?? initialAtlas}
                selectedOrganizationKey={selectedOrganization?.organizationKey}
                onSelect={selectOrganization}
              />
            </>
          )}

          {selectedOrganization ? (
            <SelectedOrganizationCard
              organization={selectedOrganization}
              atlas={atlas.data}
              onClear={() => setSelectedOrganization(undefined)}
            />
          ) : null}
        </section>

        <div className="mt-20">
          <PeopleDirectoryView
            initialData={initialDirectory}
            organizationKey={selectedOrganization?.organizationKey}
            organizationName={selectedOrganization?.organizationName}
            onClearOrganization={() => setSelectedOrganization(undefined)}
            onSelectPerson={setSelectedPerson}
          />
        </div>
      </div>
      <PersonDrawer
        login={selectedPerson}
        onClose={() => setSelectedPerson(undefined)}
      />
    </main>
  );
};

const HeadlineMetric = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: number;
}) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
    <div className="text-emerald-200/75">{icon}</div>
    <p className="mt-4 text-3xl font-medium tabular-nums">
      {value?.toLocaleString() ?? '—'}
    </p>
    <p className="mt-1 text-xs text-white/40">{label}</p>
  </div>
);

const ViewButton = ({
  isActive,
  icon,
  label,
  onClick,
}: {
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    aria-pressed={isActive}
    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
      isActive ? 'bg-white text-black' : 'text-white/55 hover:text-white'
    }`}
    onClick={onClick}
  >
    {icon}
    {label}
  </button>
);

const SelectedOrganizationCard = ({
  organization,
  atlas,
  onClear,
}: {
  organization: SelectedOrganization;
  atlas?: PeopleAtlas;
  onClear: () => void;
}) => {
  const node = atlas?.organizations.find(
    (candidate) => candidate.organizationKey === organization.organizationKey,
  );
  return (
    <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.045] p-4 md:flex-row md:items-center">
      {organization.logoUrl ? (
        <Image
          unoptimized
          src={organization.logoUrl}
          alt=""
          width={48}
          height={48}
          className="size-12 rounded-xl bg-white/5 object-cover"
        />
      ) : null}
      <div className="min-w-0 grow">
        <h3 className="truncate font-medium text-white">
          {organization.organizationName}
        </h3>
        <p className="mt-1 text-xs text-white/45">
          {node
            ? `${node.activePeople.toLocaleString()} active people · ${node.activeMaintainers.toLocaleString()} maintainers`
            : 'The People directory is now filtered to this organization.'}
        </p>
      </div>
      <div className="flex gap-2">
        {organization.organizationId ? (
          <Link
            href={`/organizations/info/${organization.organizationSlug}/team`}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 hover:bg-white/10"
          >
            Team detail
          </Link>
        ) : null}
        <button
          type="button"
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/50 hover:bg-white/10"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

const formatPeriod = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
