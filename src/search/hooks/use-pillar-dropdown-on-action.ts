import { useRouter } from 'next/navigation';

import { normalizeString } from '@/shared/utils/normalize-string';

import { createPillarItemHref } from '@/search/utils/create-pillar-item-href';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

interface Options {
  nav: string;
  pillar: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  activeLabelsSet: Set<string>;
  onClear: () => void;
  isIndex?: boolean;
}

export const usePillarDropdownOnAction = (options: Options) => {
  const {
    nav,
    pillar,
    params,
    searchParams,
    activeLabelsSet,
    onClear,
    isIndex,
  } = options;

  const router = useRouter();
  const { startTransition } = usePendingRoute();

  const onAction = (key: React.Key) => {
    if (key) {
      const isActive = activeLabelsSet.has(key as string);

      const pathPrefix = `/${nav}/${params.pillar}/${params.item}`;

      const slug = normalizeString(key as string);
      let href: string;
      if (isIndex) {
        const nextSearchParams = new URLSearchParams(searchParams);
        nextSearchParams.delete(pillar);
        const query = nextSearchParams.toString();
        href = `/${nav}/${pillar}/${slug}${query ? `?${query}` : ''}`;
      } else {
        href = createPillarItemHref({
            isActive,
            pathPrefix,
            searchParams,
            pillar,
            slug,
          });
      }

      startTransition(() => {
        router.push(href);
        onClear();
      });
    }
  };

  return { onAction };
};
