import { createContext, useContext } from 'react';

import { FundingRound, GrantFunding } from '@/shared/core/schemas';

import { LineItem } from './types';
import { useFundingItems } from './use-funding-items';
import { useGrantItems } from './use-grant-items';
interface LineGroup {
  activeGroups: Set<string>;
  toggleGroup: (group: string) => void;
  items: LineItem[];
  grandTotal: number;
  subTotal: number;
  percentage: number;
}

interface FundingSplitCtx {
  grants: LineGroup;
  funding: LineGroup;
}

export const FundingSplitContext = createContext<FundingSplitCtx>({
  grants: {
    activeGroups: new Set(),
    toggleGroup: () => {},
    items: [],
    grandTotal: 0,
    subTotal: 0,
    percentage: 0,
  },
  funding: {
    activeGroups: new Set(),
    toggleGroup: () => {},
    items: [],
    grandTotal: 0,
    subTotal: 0,
    percentage: 0,
  },
});

export const useFundingSplitContext = () => {
  const ctx = useContext(FundingSplitContext);
  if (!ctx) {
    throw new Error(
      'useFundingSplitContext must be used within a FundingSplitContext',
    );
  }
  return ctx;
};

interface ProviderProps {
  grants: GrantFunding[];
  fundingRounds: FundingRound[];
  children: React.ReactNode;
}

export const FundingSplitProvider = (props: ProviderProps) => {
  const { grants: grantFundings, fundingRounds, children } = props;

  const grants = useGrantItems(grantFundings);
  const funding = useFundingItems(fundingRounds);

  const grandTotal = grants.grandTotal + funding.grandTotal;
  const grantsPercentage = (grants.grandTotal / grandTotal) * 100;
  const fundingPercentage = (funding.grandTotal / grandTotal) * 100;

  return (
    <FundingSplitContext.Provider
      value={{
        grants: {
          ...grants,
          percentage: grantsPercentage,
        },
        funding: {
          ...funding,
          percentage: fundingPercentage,
        },
      }}
    >
      {children}
    </FundingSplitContext.Provider>
  );
};
