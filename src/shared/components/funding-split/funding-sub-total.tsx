'use client';

import { formatNumber } from '@/shared/utils/format-number';

import { useFundingSplitContext } from './context';

export const FundingSubTotal = () => {
  const {
    funding: { subTotal },
  } = useFundingSplitContext();

  return <p className="text-sm">{`$${formatNumber(subTotal)}`}</p>;
};
