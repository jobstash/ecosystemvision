import { capitalize } from '@/shared/utils/capitalize';

import { TPillarInfo } from '@/search/core/schemas';
import { findPillarItem } from '@/search/utils/find-pillar-item';

export const getInputItems = (
  nav: string,
  pillarInfo: TPillarInfo,
  itemParam: string,
  item2Param?: string,
): { label: string; href: string }[] => {
  const { activePillar, altPillar } = pillarInfo;

  if (itemParam === 'all') {
    return [
      {
        label: `All ${capitalize(activePillar.slug, true)}`,
        href: `/${nav}/${activePillar.slug}`,
      },
    ];
  }

  const activeItem = findPillarItem(activePillar.items, itemParam);

  const result = [];

  if (activeItem) {
    // Clicking active-pillar-item redirects to search
    result.push({
      label: activeItem,
      href: `/search`,
    });
  }

  if (altPillar) {
    if (item2Param === 'all') {
      result.push({
        label: `All ${capitalize(altPillar.slug, true)}`,
        href: `/${nav}/${activePillar.slug}`,
      });
      return result;
    }

    const altItem = findPillarItem(altPillar.items, item2Param);
    if (altItem) {
      result.push({
        label: altItem,
        href: `/${nav}/${activePillar.slug}/${itemParam}`,
      });
    }
  }

  return result;
};
