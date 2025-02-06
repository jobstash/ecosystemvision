import { useMemo, useState } from 'react';

import { GrantFunding } from '@/shared/core/schemas';
import { formatNumber } from '@/shared/utils/format-number';
import { shortTimestamp } from '@/shared/utils/short-timestamp';

import { LineItem } from './types';

const createLineItem = (
  grant: GrantFunding,
  activeGroups: Set<string>,
  grandTotal: number,
): LineItem | null => {
  const { amount, tokenAmount, tokenUnit, fundingDate, programName } = grant;
  if (!amount || !tokenUnit) return null;

  const group = tokenUnit;
  const percentage = (amount / grandTotal) * 100;
  const isActive = activeGroups.has(group);

  const title = !programName || programName === 'N/A' ? 'Unknown' : programName;

  const tokenInfo = tokenAmount
    ? `${formatNumber(tokenAmount)} ${tokenUnit}`
    : '';
  const raised = `$${formatNumber(amount)}`;
  const info = tokenInfo ? `Tokens: ${tokenInfo}` : undefined;
  const date = fundingDate ? shortTimestamp(fundingDate / 1000) : undefined;

  return {
    group,
    amount,
    percentage,
    isActive,
    title,
    raised,
    info,
    date,
    tokenAmount,
  };
};

export const useGrantItems = (grants: GrantFunding[]) => {
  const [activeGroups, setActiveGroups] = useState<Set<string>>(new Set());
  const hasActiveGroups = activeGroups.size > 0;

  const grandTotal = useMemo(
    () => grants.reduce((acc, grant) => acc + (grant.amount ?? 0), 0),
    [grants],
  );

  const items = useMemo(
    () =>
      grants
        .map((grant) => createLineItem(grant, activeGroups, grandTotal))
        .filter((item): item is LineItem => Boolean(item))
        .sort((a, b) => a.group.localeCompare(b.group)),
    [grants, activeGroups, grandTotal],
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

  const toggleGroup = (group: string) => {
    setActiveGroups((prev) => {
      const next = new Set(prev);
      next.has(group) ? next.delete(group) : next.add(group);
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
