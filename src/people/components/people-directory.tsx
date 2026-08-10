'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Search, Users, X } from 'lucide-react';

import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { PeopleDirectory as PeopleDirectoryData } from '@/people/core/schemas';
import { getPeopleDirectory } from '@/people/data/get-people';

interface Props {
  initialData: PeopleDirectoryData;
  organizationKey?: string;
  organizationName?: string;
  onClearOrganization: () => void;
  onSelectPerson: (login: string) => void;
}

export const PeopleDirectory = ({
  initialData,
  organizationKey,
  organizationName,
  onClearOrganization,
  onSelectPerson,
}: Props) => {
  const [query, setQuery] = useState('');
  const [maintainersOnly, setMaintainersOnly] = useState(false);
  const [currentOnly, setCurrentOnly] = useState(false);
  const debouncedQuery = useDebouncedValue(query.trim(), 250);
  const result = useInfiniteQuery({
    queryKey: [
      'people-directory',
      debouncedQuery,
      organizationKey,
      maintainersOnly,
      currentOnly,
    ],
    queryFn: ({ pageParam }) =>
      getPeopleDirectory({
        query: debouncedQuery || undefined,
        organizationKey,
        maintainer: maintainersOnly || undefined,
        current: currentOnly || undefined,
        cursor: pageParam || undefined,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData:
      !debouncedQuery && !organizationKey && !maintainersOnly && !currentOnly
        ? { pages: [initialData], pageParams: [null] }
        : undefined,
  });
  const people = useMemo(
    () => result.data?.pages.flatMap((page) => page.data) ?? [],
    [result.data?.pages],
  );
  const viewportRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: people.length,
    getScrollElement: () => viewportRef.current,
    estimateSize: () => 70,
    overscan: 8,
  });

  return (
    <section aria-labelledby="people-directory-heading">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
            Complete directory
          </p>
          <h2
            id="people-directory-heading"
            className="mt-1 font-grotesk text-2xl font-medium text-white"
          >
            People timelines
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-white/50">
            Every row is a canonical internal employee. Maintainers are internal
            employees who have merged pull requests; external contributors are
            excluded.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-white/65">
            <input
              type="checkbox"
              checked={maintainersOnly}
              onChange={(event) => setMaintainersOnly(event.target.checked)}
            />
            Maintainers
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-white/65">
            <input
              type="checkbox"
              checked={currentOnly}
              onChange={(event) => setCurrentOnly(event.target.checked)}
            />
            Currently active
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="flex min-h-11 grow items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3">
          <Search className="size-4 text-white/35" aria-hidden="true" />
          <span className="sr-only">Search people</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a GitHub login, person, or organization"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
        </label>
        {organizationKey ? (
          <button
            type="button"
            className="flex min-h-11 items-center gap-2 rounded-xl border border-emerald-300/25 bg-emerald-300/10 px-3 text-sm text-emerald-100"
            onClick={onClearOrganization}
          >
            {organizationName ?? organizationKey}
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div
        ref={viewportRef}
        className="mt-4 h-[520px] overflow-auto rounded-2xl border border-white/10 bg-[#0d0f13]"
      >
        {result.isLoading ? (
          <DirectoryState text="Loading people…" />
        ) : people.length ? (
          <div
            className="relative"
            style={{ height: virtualizer.getTotalSize() }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const person = people[virtualRow.index];
              return (
                <button
                  type="button"
                  key={person.personId}
                  onClick={() => onSelectPerson(person.login)}
                  className="absolute left-0 flex w-full items-center gap-3 border-b border-white/[0.055] px-4 text-left transition hover:bg-white/[0.04]"
                  style={{
                    height: 70,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <PersonAvatar person={person} />
                  <span className="min-w-0 grow">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-white">
                        {person.displayName || `@${person.login}`}
                      </span>
                      {person.activeLead ? (
                        <span className="text-10 uppercase tracking-wide text-amber-200">
                          Active lead
                        </span>
                      ) : person.maintainer ? (
                        <span className="text-10 uppercase tracking-wide text-violet-200">
                          Maintainer
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block truncate text-xs text-white/45">
                      @{person.login} · {person.currentOrganizationName} ·{' '}
                      {person.organizationCount} organization
                      {person.organizationCount === 1 ? '' : 's'}
                    </span>
                  </span>
                  <span className="hidden text-right text-xs tabular-nums text-white/40 sm:block">
                    {person.commitCount.toLocaleString()} commits
                    <span className="block">
                      Last active {formatMonth(person.lastActivityAt)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <DirectoryState text="No people match these filters." />
        )}
      </div>
      {result.hasNextPage ? (
        <button
          type="button"
          className="mt-3 w-full rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 disabled:opacity-40"
          disabled={result.isFetchingNextPage}
          onClick={() => result.fetchNextPage()}
        >
          {result.isFetchingNextPage ? 'Loading…' : 'Load more people'}
        </button>
      ) : null}
      <div className="mt-3 flex items-center justify-between text-xs text-white/35">
        <span>{people.length.toLocaleString()} people loaded</span>
        <Link href="/people" className="inline-flex items-center gap-1 hover:text-white">
          <Users className="size-3" aria-hidden="true" /> People index
        </Link>
      </div>
    </section>
  );
};

const PersonAvatar = ({
  person,
}: {
  person: PeopleDirectoryData['data'][number];
}) =>
  person.avatarUrl ? (
    <Image
      unoptimized
      src={person.avatarUrl}
      alt=""
      width={38}
      height={38}
      className="size-[38px] rounded-full bg-white/5 object-cover"
    />
  ) : (
    <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-white/50">
      {person.login.slice(0, 1).toUpperCase()}
    </span>
  );

const DirectoryState = ({ text }: { text: string }) => (
  <div className="flex h-full items-center justify-center text-sm text-white/40">
    {text}
  </div>
);

const formatMonth = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
