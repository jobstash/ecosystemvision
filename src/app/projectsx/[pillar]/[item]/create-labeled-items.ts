import { normalizeString } from '@/shared/utils/normalize-string';

import { LabeledItem } from './types';

interface Options {
  nav: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  fetchedLabels: { slug: string; label: string }[];
}

/**
 * Returns pillar-search-items that maps fetched slug-label with correct href.
 * Href should correspond to the item being removed in search params.
 * Active main-pillar-item should link back to /search page.
 * Can safely assume main-pillar-item is included in fetchedLabels - page already has logic if main-pillar-item is 404.
 */
export const createLabeledItems = ({
  nav: _nav,
  params,
  searchParams,
  fetchedLabels,
}: Options) => {
  const result: LabeledItem[] = [];

  const items = {
    [params.pillar]: params.item,
    ...searchParams,
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
          href: '/search',
        });
        continue;
      }

      const prefixUrl = `/projectsx/${params.pillar}/${params.item}`;
      const newSearchParams = new URLSearchParams(searchParams);
      const currentItems = newSearchParams.get(pillar)?.split(',') ?? [];
      const newItems = currentItems.filter((item) => item !== slug);

      if (newItems.length > 0) {
        newSearchParams.set(pillar, newItems.join(','));
      } else {
        newSearchParams.delete(pillar);
      }

      const href = `${prefixUrl}?${newSearchParams.toString()}`;
      result.push({ pillar, slug, label, href });
    }
  }

  return result;
};
