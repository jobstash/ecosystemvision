'use client';

import { useMemo } from 'react';

import { formatNumber } from '@/shared/utils/format-number';

import { useFundingSplitContext } from './context';

export const GrantsTotal = () => {
  const {
    grants: { items, activeGroups, subTotal },
  } = useFundingSplitContext();

  const tokenAmounts = useMemo(() => {
    const hasActiveGroups = activeGroups.size > 0;
    const filteredItems = hasActiveGroups
      ? items.filter((item) => item.isActive)
      : items;

    const tokenGroups = filteredItems.reduce<Record<string, number>>(
      (acc, item) => {
        const amount = item.tokenAmount ?? 0;
        acc[item.group] = (acc[item.group] || 0) + amount;
        return acc;
      },
      {},
    );

    return Object.entries(tokenGroups).map(
      ([label, amount]) => `${formatNumber(amount)} ${label}`,
    );
  }, [activeGroups.size, items]);

  return (
    <p className="pl-1 text-sm">
      ${formatNumber(subTotal)}
      {tokenAmounts.length > 0 && (
        <span className="pl-1 text-xs text-white/50">
          {tokenAmounts.join(' + ')}
        </span>
      )}
    </p>
  );
};
