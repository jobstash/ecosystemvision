import { useMemo } from 'react';

import { normalizeString } from '@/shared/utils/normalize-string';

interface Options {
  value: string;
  activeLabelsSet: Set<string>;
  params: { item: string };
  items: string[];
}

export const useDropdownItems = (options: Options) => {
  const { value, activeLabelsSet, params, items } = options;

  const activeLabels = useMemo(() => {
    return Array.from(activeLabelsSet);
  }, [activeLabelsSet]);

  const mainLabel = useMemo(
    () =>
      Array.from(activeLabelsSet).find(
        (label) => normalizeString(label) === params.item,
      ),
    [activeLabelsSet, params.item],
  );

  const activeItems = useMemo(() => {
    return [
      ...(mainLabel ? [mainLabel] : []),
      ...activeLabels.filter((label) => label !== mainLabel),
    ].filter((item) => item.toLowerCase().includes(value.toLowerCase()));
  }, [activeLabels, value, mainLabel]);

  const optionItems = useMemo(() => {
    return items.filter((item) => !activeLabelsSet.has(item));
  }, [activeLabelsSet, items]);

  return {
    mainLabel,
    activeItems,
    optionItems,
  };
};
