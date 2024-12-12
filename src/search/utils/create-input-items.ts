import { capitalize } from '@/shared/utils/capitalize';
import {
  denormalizeString,
  normalizeString,
} from '@/shared/utils/normalize-string';

import { TPillarItem } from '@/search/core/types';

export const createInputItems = (
  activeItems: Record<string, TPillarItem[]>,
  itemParam: string,
): TPillarItem[] => {
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
  const items = [
    ...(mainItem ? [{ ...mainItem, href: '/search' }] : []),
    ...remainingMainItems,
    ...altItemsArray,
  ];

  return items.map((item) => ({
    ...item,
    label: capitalize(denormalizeString(item.label)),
  }));
};
