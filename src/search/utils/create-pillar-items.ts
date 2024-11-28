import { normalizeString } from '@/shared/utils/normalize-string';

import { TPillarInfo } from '@/search/core/schemas';
import { createAllItemsLabel } from '@/search/utils/create-all-items-label';

type PillarParams = { item: string; item2?: string };

export const createPillarItems = (
  nav: string,
  pillarInfo: TPillarInfo,
  params: PillarParams,
) => {
  const { activePillar, altPillar } = pillarInfo;

  const activeHrefPrefix = `/${nav}/${activePillar.slug}`;
  const activeItems = [
    {
      label: createAllItemsLabel(activePillar.slug),
      href: `${activeHrefPrefix}/all`,
    },
    ...activePillar.items.map((pillarItem) => ({
      label: pillarItem,
      href: `${activeHrefPrefix}/${normalizeString(pillarItem)}`,
    })),
  ];

  const altItems = [];

  if (altPillar) {
    const altHrefPrefix = `/${nav}/${activePillar.slug}/${params.item}/${altPillar.slug}`;
    altItems.push(
      {
        label: createAllItemsLabel(altPillar.slug),
        href: `${altHrefPrefix}/all`,
      },
      ...altPillar.items.map((pillarItem) => ({
        label: pillarItem,
        href: `${altHrefPrefix}/${normalizeString(pillarItem)}`,
      })),
    );
  }

  return { activeItems, altItems };
};
