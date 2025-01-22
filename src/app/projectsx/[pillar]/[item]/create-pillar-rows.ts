import { normalizeString } from '@/shared/utils/normalize-string';

import { PillarDto } from '@/search/core/schemas';

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
 */
export const createPillarRows = (options: Options) => {
  const { nav, params, searchParams, labeledItems, pillars } = options;
  const pathPrefix = `/${nav}/${params.pillar}/${params.item}`;

  const selectedPillarLabels = new Set<string>(
    labeledItems
      .filter(({ label }) => !!label)
      .map(({ pillar, label }) => `${pillar}-${label}`),
  );

  const pillarRows = pillars.flatMap(({ slug: pillar, items }) => {
    const mappedItems = items.map((label) => {
      if (normalizeString(label) === params.item) {
        return {
          label,
          href: '',
          isActive: true,
        };
      }

      const newSearchParams = new URLSearchParams(searchParams);
      const paramValues = newSearchParams.get(pillar)?.split(',') ?? [];
      paramValues.push(normalizeString(label));
      newSearchParams.set(pillar, paramValues.join(','));
      return {
        label,
        href: `${pathPrefix}?${newSearchParams.toString()}`,
        isActive: selectedPillarLabels.has(`${pillar}-${label}`),
      };
    });

    return {
      pillar,
      items: mappedItems,
    };
  });

  return pillarRows;
};
