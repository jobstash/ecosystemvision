import Link from 'next/link';

import { cn } from '@/shared/utils/cn';
import { normalizeString } from '@/shared/utils/normalize-string';

import { OrganizationIntelligence } from '@/orgs/core/schemas';

interface Props {
  intelligence: OrganizationIntelligence;
  isCompact?: boolean;
  showCoverage?: boolean;
}

const BADGE_CLASS_NAME =
  'rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/75';

export const OrganizationIntelligenceBadges = ({
  intelligence,
  isCompact = false,
  showCoverage = false,
}: Props) => {
  const {
    fundingStage,
    recentlyFunded,
    teamCoverageStatus,
    currentMaintainerCount,
    growingTeam,
    shrinkingTeam,
    earlyTeamShrinkage,
  } = intelligence;
  const hasCurrentTeamCoverage = teamCoverageStatus === 'current';

  return (
    <div className={cn('flex flex-wrap gap-2', { 'gap-1.5': isCompact })}>
      {fundingStage ? (
        <Link
          className={cn(BADGE_CLASS_NAME, 'border-sky-300/25 text-sky-200')}
          href={`/organizations/fundingStages/${normalizeString(fundingStage)}`}
        >
          Current stage: {fundingStage}
        </Link>
      ) : null}
      {recentlyFunded ? (
        <span
          className={cn(
            BADGE_CLASS_NAME,
            'border-emerald-300/25 text-emerald-200',
          )}
        >
          Funded in the last 6 months
        </span>
      ) : null}
      {hasCurrentTeamCoverage && currentMaintainerCount !== null ? (
        <span className={BADGE_CLASS_NAME}>
          {currentMaintainerCount} current{' '}
          {currentMaintainerCount === 1 ? 'maintainer' : 'maintainers'}
        </span>
      ) : null}
      {hasCurrentTeamCoverage && growingTeam ? (
        <span
          className={cn(
            BADGE_CLASS_NAME,
            'border-emerald-300/25 text-emerald-200',
          )}
        >
          Growing maintainer team
        </span>
      ) : null}
      {hasCurrentTeamCoverage && shrinkingTeam ? (
        <span
          className={cn(BADGE_CLASS_NAME, 'border-amber-300/25 text-amber-200')}
        >
          Maintainer movements detected
        </span>
      ) : null}
      {hasCurrentTeamCoverage && earlyTeamShrinkage ? (
        <span
          className={cn(
            BADGE_CLASS_NAME,
            'border-orange-300/25 text-orange-200',
          )}
        >
          Early-team movements detected
        </span>
      ) : null}
      {showCoverage && teamCoverageStatus === 'unknown' ? (
        <span className={cn(BADGE_CLASS_NAME, 'text-white/45')}>
          Maintainer coverage unavailable
        </span>
      ) : null}
    </div>
  );
};
