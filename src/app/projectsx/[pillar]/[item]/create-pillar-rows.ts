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

      const isActive = selectedPillarLabels.has(`${pillar}-${label}`);
      const slug = normalizeString(label);
      const href = createPillarItemHref({
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
      };
    });

    return {
      pillar,
      items: mappedItems,
    };
  });

  return pillarRows;
};
