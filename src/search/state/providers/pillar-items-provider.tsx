import { useEffect, useRef, useState } from 'react';

import { TPillarItem } from '@/search/core/types';
import { createPillarItems } from '@/search/utils/create-pillar-items';
import { usePillarInfo } from '@/search/hooks/use-pillar-info';

import { PillarItemsContext } from '@/search/state/contexts/pillar-items-context';

interface Props {
  nav: string;
  params: {
    pillar: string;
    item: string;
    pillar2?: string;
    item2: string;
  };
  children: React.ReactNode;
}

export const PillarItemsProvider = ({ nav, params, children }: Props) => {
  const { data: pillarInfo } = usePillarInfo({ nav, ...params });

  const [mainItems, setMainItems] = useState<TPillarItem[]>([]);
  const [altItems, setAltItems] = useState<TPillarItem[]>([]);

  const initRef = useRef(false);
  useEffect(() => {
    if (pillarInfo && !initRef.current) {
      initRef.current = true;
      const { mainItems, altItems } = createPillarItems(
        nav,
        pillarInfo,
        params,
      );
      setMainItems(mainItems);
      setAltItems(altItems);
    }
  }, [nav, params, pillarInfo]);

  const selectDropdownItem = (item: TPillarItem, isMain?: boolean) => {
    const fn = isMain ? setMainItems : setAltItems;
    fn(unshiftItemUpdate(item));
  };

  const value = {
    isLoading: !pillarInfo,
    mainItems,
    altItems,
    selectDropdownItem,
  };

  return (
    <PillarItemsContext.Provider value={value}>
      {children}
    </PillarItemsContext.Provider>
  );
};

const unshiftItemUpdate = (item: TPillarItem) => (prev: TPillarItem[]) => [
  item,
  ...prev.filter((i) => i.label !== item.label),
];
