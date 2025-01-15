import { normalizeString } from '@/shared/utils/normalize-string';

import { InputPillarItem } from '@/search/core/types';

export const createInputItems = (
  activeItems: Record<string, InputPillarItem[]>,
  itemParam: string | null,
  mainPillar: string,
) => {
  if (!itemParam) return { inputs: [], pillars: [] };

  // Get the current main item if it exists
  const mainItem = (activeItems.include ?? []).find(
    (item) => normalizeString(item.label) === itemParam,
  );

  // Get remaining include items (excluding the main item)
  const remainingMainItems = (activeItems.include ?? []).filter(
    (item) => normalizeString(item.label) !== itemParam,
  );

  // Get all alt items
  const altItemsArray = Object.entries(activeItems)
    .filter(([key]) => key !== 'include')
    .flatMap(([_, items]) => items);

  // Combine all items in the desired order
  const inputs = [
    ...(mainItem ? [{ ...mainItem, href: '/search' }] : []),
    ...remainingMainItems,
    ...altItemsArray,
  ];

  const pillars: string[] = Object.keys(activeItems).map((key) =>
    key === 'include' ? mainPillar : key,
  );

  return { inputs, pillars };
};
