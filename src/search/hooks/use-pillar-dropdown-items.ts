import { useMemo } from 'react';

import { useAtomValue } from 'jotai';

import { hiddenPillarItemsAtom } from '@/search/core/atoms';

interface Options {
  value: string;
  activeLabelsSet: Set<string>;
  items: string[];
  pillar: string;
  mainLabel?: string;
  overrideHiddenItems?: string[];
}

export const usePillarDropdownItems = (options: Options) => {
  const {
    value,
    activeLabelsSet,
    items,
    mainLabel,
    pillar,
    overrideHiddenItems,
  } = options;

  const hiddenItemsMap = useAtomValue(hiddenPillarItemsAtom);
  const hiddenItemsSet = useMemo(() => {
    if (overrideHiddenItems) return new Set(overrideHiddenItems);
    const itemsSet = new Set(items);
    const hiddenPillarItems = hiddenItemsMap[pillar] || [];
    const result = hiddenPillarItems.filter((item) => !itemsSet.has(item));
    return new Set(result);
  }, [hiddenItemsMap, items, pillar, overrideHiddenItems]);

  const activeItems = useMemo(() => {
    return [
      ...(mainLabel ? [mainLabel] : []),
      ...Array.from(activeLabelsSet).filter((label) => label !== mainLabel),
    ].filter((item) => item.toLowerCase().includes(value.toLowerCase()));
  }, [mainLabel, activeLabelsSet, value]);

  const optionItems = useMemo(() => {
    return [
      ...Array.from(hiddenItemsSet),
      ...items,
      // .filter((item) => !hiddenItemsSet.has(item)),
    ].filter(
      (item) =>
        !activeLabelsSet.has(item) &&
        item.toLowerCase().includes(value.toLowerCase()),
    );
  }, [activeLabelsSet, hiddenItemsSet, items, value]);

  return {
    activeItems,
    optionItems,
  };
};
