import {
  denormalizeString,
  normalizeString,
} from '@/shared/utils/normalize-string';

import { TPillarInfo } from '@/search/core/schemas';
import {
  PillarParams,
  PillarSearchParams,
  PillarSelections,
  TPillarItem,
} from '@/search/core/types';
import { createPillarItemHref } from '@/search/utils/create-pillar-item-href';
import { createToggledPillarItemSearchParam } from '@/search/utils/create-toggled-pillar-item-search-param';

interface Props {
  nav: string;
  pillarInfo: TPillarInfo;
  params: PillarParams;
  searchParams: PillarSearchParams;
  isIndex?: boolean;
}

export const createPillarItems = (props: Props) => {
  const {
    params,
    searchParams,
    pillarInfo: { mainPillar, altPillars },
    isIndex,
  } = props;
  const selections = getPillarItemSelections(props);

  const mainItems: TPillarItem[] = [];

  mainPillar.items.forEach((itemLabel, index) => {
    const itemSlug = normalizeString(itemLabel);
    const isActive =
      selections.include.includes(itemSlug) || itemSlug === params.item;
    const newSearchparams = createToggledPillarItemSearchParam({
      itemSlug,
      pillarParamKey: 'include',
      isActive,
      searchParams,
    });

    const overrideUrl = isIndex
      ? {
          pillar: mainPillar.slug,
          item: mainPillar.items[index],
        }
      : undefined;

    mainItems.push({
      label: itemLabel,
      href: createPillarItemHref(props, newSearchparams, overrideUrl),
      isActive,
    });
  });

  const altPillarEntries = altPillars.map((pillar) => [pillar.slug, []]);
  const altItems: Record<string, TPillarItem[]> =
    Object.fromEntries(altPillarEntries);

  altPillars.forEach((altPillar) => {
    altPillar.items.forEach((itemLabel, index) => {
      const itemSlug = normalizeString(itemLabel);
      const isActive = selections[altPillar.slug].includes(itemSlug);
      const newSearchParams = createToggledPillarItemSearchParam({
        itemSlug,
        pillarParamKey: altPillar.slug,
        isActive,
        searchParams,
      });

      const overrideUrl = isIndex
        ? {
            pillar: altPillar.slug,
            item: altPillar.items[index],
          }
        : undefined;

      altItems[altPillar.slug].push({
        label: itemLabel,
        href: createPillarItemHref(props, newSearchParams, overrideUrl),
        isActive,
      });
    });
  });

  const activeItems: Record<string, TPillarItem[]> & {
    include: TPillarItem[];
  } = {
    include: [],
    ...Object.fromEntries(altPillars.map((pillar) => [pillar.slug, []])),
  };
  Object.entries(selections).forEach(([pillarKey, items]) => {
    items.forEach((normalizedLabel) => {
      const label = denormalizeString(normalizedLabel);
      const newSearchParams = createToggledPillarItemSearchParam({
        itemSlug: normalizedLabel,
        pillarParamKey: pillarKey,
        isActive: true,
        searchParams,
      });

      activeItems[pillarKey].push({
        label,
        href: createPillarItemHref(props, newSearchParams),
        isActive: true,
      });
    });
  });

  return { mainItems, altItems, activeItems };
};

const getPillarItemSelections = (props: Props): PillarSelections => {
  const { pillarInfo, params, searchParams } = props;

  const selections: PillarSelections = {};

  // Selected main-pillar items
  selections['include'] = [
    ...(params.item ? [params.item] : []),
    ...(searchParams.include?.split(',') || []),
  ];

  // Selected alt-pillar items
  pillarInfo.altPillars.forEach((pillar) => {
    selections[pillar.slug] = searchParams[pillar.slug]?.split(',') || [];
  });

  return selections;
};
