import { useMemo } from 'react';

import { useAtomValue } from 'jotai';

import { hiddenPillarItemsAtom } from '@/search/core/atoms';

interface Options {
  value: string;
  activeLabelsSet: Set<string>;
  items: string[];
  mainLabel: string;
  pillar: string;
}

export const useDropdownItems = (options: Options) => {
  const { value, activeLabelsSet, items, mainLabel, pillar } = options;

  const hiddenItemsMap = useAtomValue(hiddenPillarItemsAtom);
  const hiddenItems = useMemo(() => {
    const itemsSet = new Set(items);
    const hiddenPillarItems = hiddenItemsMap[pillar] || [];
    return hiddenPillarItems.filter((item) => !itemsSet.has(item));
  }, [hiddenItemsMap, items, pillar]);

  const activeLabels = useMemo(() => {
    return Array.from(activeLabelsSet);
  }, [activeLabelsSet]);

  const activeItems = useMemo(() => {
    return [
      ...(mainLabel ? [mainLabel] : []),
      ...activeLabels.filter((label) => label !== mainLabel),
    ].filter((item) => item.toLowerCase().includes(value.toLowerCase()));
  }, [activeLabels, value, mainLabel]);

  const optionItems = useMemo(() => {
    return [...hiddenItems, ...items].filter(
      (item) => !activeLabelsSet.has(item),
    );
  }, [activeLabelsSet, hiddenItems, items]);

  return {
    activeItems,
    optionItems,
  };
};