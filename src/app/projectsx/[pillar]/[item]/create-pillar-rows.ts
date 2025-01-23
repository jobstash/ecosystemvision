import { normalizeString } from '@/shared/utils/normalize-string';

import { PillarDto } from '@/search/core/schemas';

import { createPillarItemHref } from './create-pillar-item-href';
import { LabeledItem } from './types';

interface Options {
  nav: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  labeledItems: LabeledItem[];
  pillars: PillarDto[];
}

/**
 * Create pillar rows with props needed for the ui.
 * Streamlined items are items buried in the more dropdown but included in the search params.
 */
export const createPillarRows = (options: Options) => {
  const { nav, params, searchParams, labeledItems, pillars } = options;
  const pathPrefix = `/${nav}/${params.pillar}/${params.item}`;

  const selectedPillarLabels = new Set<string>(
    labeledItems
      .filter(({ label }) => !!label)
      .map(({ pillar, label }) => `${pillar}-${label}`),
  );

  return pillars.flatMap(({ slug: pillar, items }) => {
    const mappedItems = items.map((label) => {
      const isMainItem = normalizeString(label) === params.item;
      if (isMainItem) return { label, href: '', isActive: true };

      const isActive = selectedPillarLabels.has(`${pillar}-${label}`);

      const href = createPillarItemHref({
        isActive,
        pathPrefix,
        searchParams,
        pillar,
        slug: normalizeString(label),
      });

      return {
        label,
        href,
        isActive,
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
      .map(({ label, href }) => ({ label: label!, href, isActive: true }));

    const isMainPillar = pillar === params.pillar;
    const arrangedItems = isMainPillar
      ? [mappedItems[0], ...streamlinedItems, ...mappedItems.slice(1)]
      : [...streamlinedItems, ...mappedItems];

    return {
      pillar,
      items: arrangedItems,
    };
  });
};
