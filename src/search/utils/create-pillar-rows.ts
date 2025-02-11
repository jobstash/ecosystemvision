import { normalizeString } from '@/shared/utils/normalize-string';

import { PillarDto } from '@/search/core/schemas';
import { LabeledItem } from '@/search/core/types';

import { createPillarItemHref } from './create-pillar-item-href';

interface Options {
  nav: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  labeledItems: LabeledItem[];
  pillars: PillarDto[];
  isIndex?: boolean;
}

/**
 * Create pillar rows with props needed for the ui.
 * Streamlined items are items buried in the more dropdown but included in the search params.
 */
export const createPillarRows = (options: Options) => {
  const { nav, params, searchParams, labeledItems, pillars, isIndex } = options;
  const pathPrefix = `/${nav}/${params.pillar}/${params.item}`;

  const selectedPillarLabels = new Set<string>(
    labeledItems
      .filter(({ label }) => !!label)
      .map(({ pillar, label }) => `${pillar}-${label}`),
  );

  return pillars.flatMap(({ slug: pillar, items }) => {
    const mappedItems = items.map((label) => {
      const isMainItem = normalizeString(label) === params.item;
      if (isMainItem)
        return { label, href: '', slug: params.item, isActive: true };

      const isActive = selectedPillarLabels.has(`${pillar}-${label}`);
      const slug = normalizeString(label);

      const href = isIndex
        ? pillar === 'names'
          ? `/${nav}/info/${slug}`
          : `/${nav}/${pillar}/${slug}`
        : createPillarItemHref({
            isActive,
            pathPrefix,
            searchParams,
            pillar,
            slug,
          });

      return {
        label,
        href,
        isActive,
        slug,
      };
    });

    const pillarPrefix = `${pillar}-`;
    const streamlinedLabels = new Set(
      [...selectedPillarLabels]
        .filter((fullLabel) => fullLabel.startsWith(pillarPrefix))
        .map((fullLabel) => fullLabel.replace(pillarPrefix, ''))
        .filter(
          (cleanLabel) =>
            !mappedItems.some(({ label }) => label === cleanLabel),
        ),
    );

    const streamlinedItems = labeledItems
      .filter(({ label }) => streamlinedLabels.has(label!))
      .map(({ label, href, slug }) => ({
        label: label!,
        href,
        slug,
        isActive: true,
      }));

    const isMainPillar = pillar === params.pillar;
    const arrangedItems = isMainPillar
      ? [mappedItems[0], ...streamlinedItems, ...mappedItems.slice(1)]
      : [...streamlinedItems, ...mappedItems];

    return {
      pillar,
      items: arrangedItems.filter(Boolean),
    };
  });
};
