import { normalizeString } from '@/shared/utils/normalize-string';

import { LabeledItem } from '@/search/core/types';

import { createPillarItemHref } from './create-pillar-item-href';

interface Options {
  nav: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  fetchedLabels: { slug: string; label: string }[];
  pillarSlugs: string[];
}

const createMainItemHref = (
  nav: string,
  nextPillar: string,
  nextItem: string | undefined,
  searchParams: Record<string, string>,
) => {
  if (!nextItem) return `/${nav}`;

  const searchParamsObj = new URLSearchParams();
  for (const [p, v] of Object.entries(searchParams)) {
    if (p === nextPillar) {
      const values = v.split(',').filter((val) => val !== nextItem);
      if (values.length) {
        searchParamsObj.set(p, values.join(','));
      }
    } else {
      searchParamsObj.set(p, v);
    }
  }

  const searchString = searchParamsObj.toString();
  return `/${nav}/${nextPillar}/${nextItem}${
    searchString ? `?${searchString}` : ''
  }`;
};

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

  const items = {
    ...searchParams,
    [params.pillar]: searchParams[params.pillar]
      ? `${params.item},${searchParams[params.pillar]}`
      : params.item,
  };

  const labeledItems = Object.entries(items).flatMap(([pillar, csv]) => {
    return csv.split(',').map((slug) => {
      const label = fetchedLabels.find((item) => item.slug === slug)?.label;

      if (slug === normalizeString(params.item)) {
        const [nextPillar, nextPillarValue] = Object.entries(items)[0];
        const nextItem = nextPillarValue
          .split(',')
          .find((v) => v !== params.item);

        const href = createMainItemHref(
          nav,
          nextPillar,
          nextItem,
          searchParams,
        );
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
