import Link from 'next/link';

import { cn } from '@/shared/utils/cn';
import { normalizeString } from '@/shared/utils/normalize-string';

import { OrganizationIntelligence } from '@/orgs/core/schemas';

interface Props {
  intelligence: OrganizationIntelligence;
  isCompact?: boolean;
}

const BADGE_CLASS_NAME =
  'rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/75';

export const OrganizationIntelligenceBadges = ({
  intelligence,
  isCompact = false,
}: Props) => {
  const {
    fundingStage,
    recentlyFunded,
    teamCoverageStatus,
    currentMaintainerCount,
    activeLeadCount,
    newActiveLeadCount,
    steppedDownLeadCount,
    movedLeadCount,
    earlyLeadDepartureCount,
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
      {hasCurrentTeamCoverage && activeLeadCount !== null ? (
        <span className={BADGE_CLASS_NAME}>
          {activeLeadCount} active {activeLeadCount === 1 ? 'lead' : 'leads'}
        </span>
      ) : null}
      {hasCurrentTeamCoverage && (newActiveLeadCount ?? 0) > 0 ? (
        <span
          className={cn(
            BADGE_CLASS_NAME,
            'border-emerald-300/25 text-emerald-200',
          )}
        >
          {newActiveLeadCount} new active{' '}
          {newActiveLeadCount === 1 ? 'lead' : 'leads'}
        </span>
      ) : null}
      {hasCurrentTeamCoverage && (steppedDownLeadCount ?? 0) > 0 ? (
        <span
          className={cn(BADGE_CLASS_NAME, 'border-amber-300/25 text-amber-200')}
        >
          {steppedDownLeadCount} lead{' '}
          {steppedDownLeadCount === 1 ? 'step-down' : 'step-downs'}
        </span>
      ) : null}
      {hasCurrentTeamCoverage && (movedLeadCount ?? 0) > 0 ? (
        <span className={cn(BADGE_CLASS_NAME, 'text-violet-200')}>
          {movedLeadCount} lead{' '}
          {movedLeadCount === 1 ? 'movement' : 'movements'}
        </span>
      ) : null}
      {hasCurrentTeamCoverage && (earlyLeadDepartureCount ?? 0) > 0 ? (
        <span
          className={cn(
            BADGE_CLASS_NAME,
            'border-orange-300/25 text-orange-200',
          )}
        >
          {earlyLeadDepartureCount} early lead{' '}
          {earlyLeadDepartureCount === 1 ? 'departure' : 'departures'}
        </span>
      ) : null}
      {hasCurrentTeamCoverage && newActiveLeadCount === null && growingTeam ? (
        <span className={BADGE_CLASS_NAME}>New active leads</span>
      ) : null}
      {hasCurrentTeamCoverage &&
      steppedDownLeadCount === null &&
      shrinkingTeam ? (
        <span className={BADGE_CLASS_NAME}>Lead step-downs</span>
      ) : null}
      {hasCurrentTeamCoverage &&
      earlyLeadDepartureCount === null &&
      earlyTeamShrinkage ? (
        <span className={BADGE_CLASS_NAME}>Early lead departures</span>
      ) : null}
    </div>
  );
};
