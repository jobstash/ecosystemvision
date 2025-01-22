import { normalizeString } from '@/shared/utils/normalize-string';

import { PillarDto } from '@/search/core/schemas';

import { LabeledItem } from './types';

interface Options {
  pathPrefix: string;
  searchParams: Record<string, string>;
  labeledItems: LabeledItem[];
  pillars: PillarDto[];
}

/**
 * Create pillar rows with props needed for the ui.
 */
export const createPillarRows = (options: Options) => {
  const { pathPrefix, searchParams, labeledItems, pillars } = options;

  const pillarRows = pillars.flatMap(({ slug: pillar, items }) => {
    const selectedLabels = new Set<string>();
    const selectedItems = labeledItems
      .filter(
        (labeledItem) => labeledItem.pillar === pillar && labeledItem.label,
      )
      .map(({ label, href }) => {
        selectedLabels.add(label as string);
        return { label: label!, href, isActive: true };
      });

    const mappedItems = items
      .map((label) => {
        const newSearchParams = new URLSearchParams(searchParams);
        const paramValues = newSearchParams.get(pillar)?.split(',') ?? [];
        paramValues.push(normalizeString(label));
        newSearchParams.set(pillar, paramValues.join(','));
        return {
          label,
          href: `${pathPrefix}?${newSearchParams.toString()}`,
          isActive: false,
        };
      })
      .filter(({ label }) => !selectedLabels.has(label));

    return {
      pillar,
      items: [...selectedItems, ...mappedItems],
    };
  });

  return pillarRows;
};
