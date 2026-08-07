import Link from 'next/link';

import { Heading } from '@/shared/components/heading';

import { OrgTeamDetails } from '@/orgs/core/schemas';

const PAGE_SIZE = 20;

interface Props {
  slug: string;
  page: number;
  team: OrgTeamDetails;
}

export const OrgDetailsTeam = ({ slug, page, team }: Props) => {
  const hasNextPage =
    page * PAGE_SIZE < Math.max(team.maintainers.total, team.movements.total);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <Heading text="Maintainer intelligence" className="text-xl" />
        <p className="mt-2 text-sm text-white/60">
          This dataset includes only GitHub identities with demonstrated write
          authority: at least three direct pushes or merges performed. External
          contributors and bots are excluded.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            label="Current maintainers"
            value={team.currentMaintainerCount}
          />
          <Metric label="New maintainers" value={team.newMaintainerCount} />
          <Metric label="Moved maintainers" value={team.movedMaintainerCount} />
          <Metric
            label="Early-team moves"
            value={team.earlyMovedMaintainerCount}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/50">
          {team.asOf ? (
            <span>Signals as of {formatDate(team.asOf)}</span>
          ) : null}
          {team.githubOrganizations.map((organization) => (
            <Link
              className="text-sky-200 transition hover:text-sky-100"
              href={`https://github.com/${encodeURIComponent(organization)}`}
              key={organization}
              rel="external noopener"
              target="_blank"
            >
              github.com/{organization}
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="qualified-maintainers">
        <Heading
          id="qualified-maintainers"
          text={`Qualified maintainers (${team.maintainers.total})`}
          className="text-xl"
        />
        {team.maintainers.data.length ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {team.maintainers.data.map((maintainer) => (
              <article
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                key={maintainer.githubUserId}
              >
                <div className="flex items-center justify-between gap-3">
                  <Link
                    className="font-semibold text-sky-200 transition hover:text-sky-100"
                    href={`https://github.com/${encodeURIComponent(maintainer.login)}`}
                    rel="external noopener"
                    target="_blank"
                  >
                    @{maintainer.login}
                  </Link>
                  <span
                    className={
                      maintainer.current
                        ? 'text-xs text-emerald-200'
                        : 'text-xs text-white/45'
                    }
                  >
                    {maintainer.current ? 'Current' : 'Former'}
                  </span>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <Stat
                    label="Write operations"
                    value={maintainer.writeOperations}
                  />
                  <Stat
                    label="First write"
                    value={formatDate(maintainer.firstWriteAt)}
                  />
                  <Stat
                    label="Qualified"
                    value={formatDate(maintainer.qualifiedAt)}
                  />
                  <Stat
                    label="Last write"
                    value={formatDate(maintainer.lastWriteAt)}
                  />
                </dl>
                {maintainer.earlyCohort ? (
                  <p className="mt-3 text-xs text-violet-200">
                    Early-team cohort
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-white/50">
            No qualified maintainers on this page.
          </p>
        )}
      </section>

      <section aria-labelledby="maintainer-movements">
        <Heading
          id="maintainer-movements"
          text={`Maintainer movements (${team.movements.total})`}
          className="text-xl"
        />
        {team.movements.data.length ? (
          <div className="mt-3 flex flex-col gap-3">
            {team.movements.data.map((movement) => (
              <article
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                key={`${movement.githubUserId}-${movement.destinationOrganizationId}-${movement.confirmedAt}`}
              >
                <p className="text-sm text-white/75">
                  <Link
                    className="font-semibold text-sky-200 transition hover:text-sky-100"
                    href={`https://github.com/${encodeURIComponent(movement.login)}`}
                    rel="external noopener"
                    target="_blank"
                  >
                    @{movement.login}
                  </Link>{' '}
                  moved write activity to{' '}
                  <Link
                    className="font-semibold text-white transition hover:text-sky-100"
                    href={`/organizations/info/${movement.destinationOrganizationSlug}`}
                  >
                    {movement.destinationOrganizationName}
                  </Link>
                  .
                </p>
                <p className="mt-2 text-xs text-white/45">
                  Confirmed {formatDate(movement.confirmedAt)} ·{' '}
                  {formatStatus(movement.status)}
                  {movement.earlyCohort ? ' · Early-team cohort' : ''}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-white/50">
            No maintainer movements on this page.
          </p>
        )}
      </section>

      {page > 1 || hasNextPage ? (
        <nav
          aria-label="Team intelligence pagination"
          className="flex items-center justify-between border-t border-white/10 pt-4"
        >
          {page > 1 ? (
            <Link
              className="text-sm text-sky-200 transition hover:text-sky-100"
              href={`/organizations/info/${slug}/team?teamPage=${page - 1}`}
            >
              Previous page
            </Link>
          ) : (
            <span />
          )}
          <span className="text-xs text-white/45">Page {page}</span>
          {hasNextPage ? (
            <Link
              className="text-sm text-sky-200 transition hover:text-sky-100"
              href={`/organizations/info/${slug}/team?teamPage=${page + 1}`}
            >
              Next page
            </Link>
          ) : (
            <span />
          )}
        </nav>
      ) : null}
    </div>
  );
};

const Metric = ({ label, value }: { label: string; value: number | null }) => (
  <div className="rounded-xl border border-white/10 p-3">
    <p className="text-2xl font-semibold text-white">{value ?? 'Unknown'}</p>
    <p className="mt-1 text-xs text-white/45">{label}</p>
  </div>
);

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <dt className="text-white/40">{label}</dt>
    <dd className="mt-0.5 text-white/70">{value}</dd>
  </div>
);

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};

const formatStatus = (
  value: OrgTeamDetails['movements']['data'][number]['status'],
) => value.charAt(0).toUpperCase() + value.slice(1);
