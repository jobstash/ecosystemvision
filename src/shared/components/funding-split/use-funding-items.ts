import { useMemo, useState } from 'react';

import { FundingRound } from '@/shared/core/schemas';
import { formatNumber } from '@/shared/utils/format-number';
import {
  getTimestampYear,
  shortTimestamp,
} from '@/shared/utils/short-timestamp';
import { LineItem } from '@/shared/components/funding-split/types';

const FUNDING_MULTIPLIER = 5_000;

const createLineItem = (
  round: FundingRound,
  activeGroups: Set<string>,
  grandTotal: number,
): LineItem | null => {
  const { raisedAmount, roundName, date } = round;
  if (!raisedAmount) return null;

  const amount = raisedAmount * FUNDING_MULTIPLIER;
  const year = getTimestampYear(date).toString();
  const percentage = (amount / grandTotal) * 100;
  const isActive = activeGroups.has(year);
  const title = roundName ?? 'Unknown';
  const raised = `$${formatNumber(amount)}`;
  const formattedDate = date ? shortTimestamp(date) : undefined;

  return {
    group: year,
    amount,
    percentage,
    isActive,
    title,
    raised,
    date: formattedDate,
  };
};

export const useFundingItems = (fundingRounds: FundingRound[]) => {
  const [activeGroups, setActiveGroups] = useState<Set<string>>(new Set());
  const hasActiveGroups = activeGroups.size > 0;

  const grandTotal = useMemo(
    () =>
      fundingRounds.reduce(
        (acc, round) => acc + (round.raisedAmount ?? 0) * FUNDING_MULTIPLIER,
        0,
      ),
    [fundingRounds],
  );

  const items = useMemo(
    () =>
      fundingRounds
        .map((round) => createLineItem(round, activeGroups, grandTotal))
        .filter((item): item is LineItem => Boolean(item))
        .sort((a, b) => a.group.localeCompare(b.group)),
    [activeGroups, fundingRounds, grandTotal],
  );

  const subTotal = useMemo(
    () =>
      hasActiveGroups
        ? items.reduce(
            (acc, item) => acc + (item.isActive ? item.amount : 0),
            0,
          )
        : grandTotal,
    [hasActiveGroups, items, grandTotal],
  );

  const toggleGroup = (year: string) => {
    setActiveGroups((prev) => {
      const next = new Set(prev);
      next.has(year) ? next.delete(year) : next.add(year);
      return next;
    });
  };

  return {
    activeGroups,
    toggleGroup,
    items,
    grandTotal,
    subTotal,
  };
};
