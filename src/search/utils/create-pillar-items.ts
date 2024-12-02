import { normalizeString } from '@/shared/utils/normalize-string';

import { TPillarInfo } from '@/search/core/schemas';
import { createAllItemsLabel } from '@/search/utils/create-all-items-label';

type PillarParams = { item: string; item2?: string };

export const createPillarItems = (
  nav: string,
  pillarInfo: TPillarInfo,
  params: PillarParams,
) => {
  const { mainPillar, altPillar } = pillarInfo;

  const activeHrefPrefix = `/${nav}/${mainPillar.slug}`;
  const mainItems = [
    {
      label: createAllItemsLabel(mainPillar.slug),
      href: `${activeHrefPrefix}/all`,
    },
    ...mainPillar.items.map((pillarItem) => ({
      label: pillarItem,
      href: `${activeHrefPrefix}/${normalizeString(pillarItem)}`,
    })),
  ];

  const altItems = [];

  if (altPillar) {
    const altHrefPrefix = `/${nav}/${mainPillar.slug}/${params.item}/${altPillar.slug}`;
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

  return { mainItems, altItems };
};
