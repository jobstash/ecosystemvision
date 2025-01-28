import { normalizeString } from '@/shared/utils/normalize-string';

import { LabeledItem } from '@/search/core/types';

import { createPillarItemHref } from './create-pillar-item-href';

interface Options {
  nav: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  fetchedLabels: { slug: string; label: string }[];
}

/**
 * Returns pillar-search-items that maps fetched slug-label with correct href.
 * Href should correspond to the item being removed in search params.
 * Can safely assume main-pillar-item is included in fetchedLabels - page already has logic if main-pillar-item is 404.
 */
export const createLabeledItems = ({ nav, params, searchParams, fetchedLabels }: Options) => {
  if (fetchedLabels.length === 0) return [];

  const result: LabeledItem[] = [];

  const items = {
    ...searchParams,
    [params.pillar]: searchParams[params.pillar]
      ? `${params.item},${searchParams[params.pillar]}`
      : params.item,
  };

  for (const [pillar, csv] of Object.entries(items)) {
    const slugs = csv.split(',');
    for (const slug of slugs) {
      const label = fetchedLabels.find((item) => item.slug === slug)?.label;
      if (slug === normalizeString(params.item)) {
        result.push({
          pillar,
          slug,
          label,
          href: '',
        });
        continue;
      }

      const pathPrefix = `/${nav}/${params.pillar}/${params.item}`;
      const href = createPillarItemHref({
        isActive: true,
        pathPrefix,
        searchParams,
        pillar,
        slug,
      });

      result.push({ pillar, slug, label, href });
    }
  }

  return removeExcludedParams(result);
};

const excludedParams = new Set(['order', 'orderBy']);

const removeExcludedParams = (items: LabeledItem[]) =>
  items.filter((item) => !excludedParams.has(item.pillar));
