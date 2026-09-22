import type { FundingRound } from '@/shared/core/schemas';

import { getTimestampYear, shortTimestamp } from './short-timestamp';

export const fundingDateLabel = (date: number | null) =>
  date === null ? 'Unknown' : shortTimestamp(date);

export const fundingYearLabel = (date: number | null) =>
  date === null ? 'Unknown date' : getTimestampYear(date).toString();

export const sortFundingRounds = (rounds: FundingRound[]) =>
  [...rounds].sort((a, b) => {
    if (a.date === null) return b.date === null ? 0 : 1;
    if (b.date === null) return -1;
    return b.date - a.date;
  });
