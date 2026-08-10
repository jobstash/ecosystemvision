import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, ExternalLink, GitMerge, UserRoundCheck } from 'lucide-react';

import { PersonProfile } from '@/people/core/schemas';

import { PersonActivityChart } from './person-activity-chart';

export const PersonProfileContent = ({ profile }: { profile: PersonProfile }) => (
  <div className="flex flex-col gap-8">
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center">
      {profile.avatarUrl ? (
        <Image
          unoptimized
          src={profile.avatarUrl}
          alt=""
          width={84}
          height={84}
          className="size-20 rounded-2xl bg-white/5 object-cover"
        />
      ) : (
        <div className="flex size-20 items-center justify-center rounded-2xl bg-white/10 text-2xl text-white/55">
          {profile.login.slice(0, 1).toUpperCase()}
        </div>
      )}
      <div className="min-w-0 grow">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="truncate font-grotesk text-3xl font-medium text-white">
            {profile.displayName || profile.login}
          </h1>
          {profile.activeLead ? (
            <RoleLabel text="Active lead" tone="amber" />
          ) : profile.maintainer ? (
            <RoleLabel text="Maintainer" tone="violet" />
          ) : (
            <RoleLabel text="Internal employee" tone="emerald" />
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-white/50">
          <span>@{profile.login}</span>
          <span>{profile.currentOrganizationName}</span>
          {profile.githubUrl ? (
            <Link
              href={profile.githubUrl}
              target="_blank"
              rel="external noopener"
              className="inline-flex items-center gap-1 text-sky-200 hover:text-sky-100"
            >
              GitHub <ExternalLink className="size-3" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </header>

    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Metric label="Internal commits" value={profile.commitCount} />
      <Metric label="PR merges" value={profile.mergeCount} />
      <Metric label="Organizations" value={profile.organizationCount} />
      <Metric
        label="Maintainer at"
        value={profile.maintainerOrganizationCount}
      />
    </dl>

    <section>
      <SectionTitle title="Activity over time" />
      <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
        <PersonActivityChart activity={profile.activity} />
      </div>
    </section>

    <section>
      <SectionTitle title="Organization timeline" />
      <div className="mt-3 flex flex-col gap-3">
        {profile.episodes.map((episode) => (
          <article
            key={`${episode.organizationKey}-${episode.episodeNumber}`}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href={
                  episode.organizationId
                    ? `/organizations/info/${episode.organizationSlug}`
                    : `https://github.com/${episode.organizationSlug}`
                }
                className="font-medium text-white hover:text-sky-100"
              >
                {episode.organizationName}
              </Link>
              <span className="text-xs text-white/45">
                {formatDate(episode.startedAt)} –{' '}
                {episode.current ? 'present' : formatDate(episode.lastActivityAt)}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/50">
              <span>{episode.commitCount.toLocaleString()} commits</span>
              <span>{episode.mergeCount.toLocaleString()} merges</span>
              {episode.maintainer ? (
                <span className="text-violet-200">Maintainer period</span>
              ) : null}
              {episode.returned ? (
                <span className="text-emerald-200">Returned</span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>

    {profile.movements.length ? (
      <section>
        <SectionTitle title="Confirmed movements" />
        <div className="mt-3 flex flex-col gap-2">
          {profile.movements.map((movement) => (
            <div
              key={`${movement.sourceOrganizationKey}-${movement.destinationOrganizationKey}-${movement.confirmedAt}`}
              className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/65"
            >
              <span>{movement.sourceOrganizationName}</span>
              <ArrowRight className="size-4 text-white/30" aria-hidden="true" />
              <span className="text-white">{movement.destinationOrganizationName}</span>
              <span className="ml-auto text-xs text-white/35">
                {formatDate(movement.confirmedAt)}
              </span>
            </div>
          ))}
        </div>
      </section>
    ) : null}

    {profile.maintainerSupport.length ? (
      <section>
        <SectionTitle title="Internal authors supported" />
        <p className="mt-1 text-sm text-white/45">
          Canonical internal employees whose pull requests this maintainer
          merged. This includes peers and does not infer seniority.
        </p>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {profile.maintainerSupport.map((support) => (
            <article
              key={support.organizationKey}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
            >
              <h3 className="font-medium text-white">
                <Link
                  className="hover:text-sky-100"
                  href={
                    support.organizationId
                      ? `/organizations/info/${support.organizationSlug}/team`
                      : `https://github.com/${support.organizationSlug}`
                  }
                >
                  {support.organizationName}
                </Link>
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <SupportStat
                  icon={<GitMerge className="size-4" />}
                  label="PRs merged"
                  value={support.mergedPrCount}
                />
                <SupportStat
                  icon={<UserRoundCheck className="size-4" />}
                  label="Internal authors"
                  value={support.internalAuthorsSupported}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                {support.internalAuthorLogins.slice(0, 12).map((login) => (
                  <Link
                    href={`/people/${encodeURIComponent(login)}`}
                    key={login}
                    className="text-sky-200 hover:text-sky-100"
                  >
                    @{login}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    ) : null}
  </div>
);

const RoleLabel = ({
  text,
  tone,
}: {
  text: string;
  tone: 'amber' | 'violet' | 'emerald';
}) => {
  const colors = {
    amber: 'border-amber-200/25 bg-amber-200/10 text-amber-100',
    violet: 'border-violet-200/25 bg-violet-200/10 text-violet-100',
    emerald: 'border-emerald-200/25 bg-emerald-200/10 text-emerald-100',
  }[tone];
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs ${colors}`}>
      {text}
    </span>
  );
};

const Metric = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
    <dd className="text-2xl font-medium tabular-nums text-white">
      {value.toLocaleString()}
    </dd>
    <dt className="mt-1 text-xs text-white/40">{label}</dt>
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="font-grotesk text-xl font-medium text-white">{title}</h2>
);

const SupportStat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) => (
  <div>
    <div className="flex items-center gap-1 text-white/35">{icon}</div>
    <p className="mt-1 text-xl tabular-nums text-white">{value.toLocaleString()}</p>
    <p className="text-xs text-white/40">{label}</p>
  </div>
);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
