import { useContext } from 'react';

import { PillarItemsContext } from '@/search/state/contexts/pillar-items-context';

export const usePillarItemsContext = () => {
  const context = useContext(PillarItemsContext);

  if (!context) {
    throw new Error(
      'usePillarItemsContext must be used within a PillarItemsContext',
    );
  }

  return context;
};
