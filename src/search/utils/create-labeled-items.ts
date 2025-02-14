import { normalizeString } from '@/shared/utils/normalize-string';

import { LabeledItem } from '@/search/core/types';
import { addMainItemToSearchParams } from '@/search/utils/add-main-item-to-search-params';
import { createMainItemHref } from '@/search/utils/create-main-item-href';

import { createPillarItemHref } from './create-pillar-item-href';

interface Options {
  nav: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  fetchedLabels: { slug: string; label: string }[];
  pillarSlugs: string[];
}

const createLabeledItem = (
  pillar: string,
  slug: string,
  label: string | undefined,
  href: string,
): LabeledItem => ({
  pillar,
  slug,
  label,
  href,
});

export const createLabeledItems = ({
  nav,
  params,
  searchParams,
  fetchedLabels,
  pillarSlugs,
}: Options) => {
  if (fetchedLabels.length === 0) return [];

  const items = addMainItemToSearchParams({
    pillar: params.pillar,
    item: params.item,
    searchParams,
  });

  const labeledItems = Object.entries(items).flatMap(([pillar, csv]) => {
    return csv.split(',').map((slug) => {
      const label = fetchedLabels.find((item) => item.slug === slug)?.label;

      if (slug === normalizeString(params.item)) {
        const href = createMainItemHref(nav, params, items);
        return createLabeledItem(pillar, slug, label, href);
      }

      const pathPrefix = `/${nav}/${params.pillar}/${params.item}`;
      const href = createPillarItemHref({
        isActive: true,
        pathPrefix,
        searchParams,
        pillar,
        slug,
      });

      return createLabeledItem(pillar, slug, label, href);
    });
  });

  const excludedParams = new Set(pillarSlugs);
  return labeledItems.filter((item) => excludedParams.has(item.pillar));
};
