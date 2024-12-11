import { createContext, useContext } from 'react';

import { TPillarItem } from '@/search/core/types';

interface PillarItemsCtx {
  items: TPillarItem[];
}

export const PillarItemsContext = createContext<PillarItemsCtx | undefined>(
  undefined,
);

export const usePillarItemsContext = () => {
  const context = useContext(PillarItemsContext);

  if (!context) {
    throw new Error(
      'usePillarItemsContext must be used within a PillarItemsContext',
    );
  }

  return context;
};

// NOTE: items can be a lot, and we dont want to serialize all items for every item
// This provider lets us not serialize all items for every item
export const PillarItemsProvider = ({
  items,
  children,
}: {
  items: TPillarItem[];
  children: React.ReactNode;
}) => {
  return (
    <PillarItemsContext.Provider value={{ items }}>
      {children}
    </PillarItemsContext.Provider>
  );
};
