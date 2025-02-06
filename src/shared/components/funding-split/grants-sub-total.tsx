'use client';

import { useMemo } from 'react';

import { formatNumber } from '@/shared/utils/format-number';

import { useFundingSplitContext } from './context';

export const GrantsSubTotal = () => {
  const {
    grants: { items, activeGroups, subTotal },
  } = useFundingSplitContext();
  const hasActiveGroups = activeGroups.size > 0;

  const tokenAmounts = useMemo(() => {
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
  }, [hasActiveGroups, items]);
  const showTokens = hasActiveGroups && tokenAmounts.length > 0;

  return (
    <p className="text-sm text-white/90">
      ${formatNumber(subTotal)}
      {showTokens && (
        <span className="pl-1 text-xs text-white/50">
          {tokenAmounts.join(', ')}
        </span>
      )}
    </p>
  );
};
