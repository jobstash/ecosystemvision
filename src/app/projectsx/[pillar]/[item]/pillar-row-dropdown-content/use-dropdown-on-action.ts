import { useRouter } from 'next/navigation';

import { normalizeString } from '@/shared/utils/normalize-string';

import { createPillarItemHref } from '../create-pillar-item-href';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Options {
  nav: string;
  pillar: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  activeLabelsSet: Set<string>;
  onClear: () => void;
  overrideItemUrl?: { pillar: string; item: string };
}

export const useDropdownOnAction = (options: Options) => {
  const {
    nav,
    pillar,
    params,
    searchParams,
    activeLabelsSet,
    onClear,
    overrideItemUrl,
  } = options;

  const router = useRouter();
  const { startTransition } = usePillarRoutesContext();

  const onAction = (key: React.Key) => {
    if (key) {
      const isActive = activeLabelsSet.has(key as string);

      const pathPrefix = `/${nav}/${params.pillar}/${params.item}`;

      const href = overrideItemUrl
        ? `/${nav}/${overrideItemUrl.pillar}/${overrideItemUrl.item}`
        : createPillarItemHref({
            isActive,
            pathPrefix,
            searchParams,
            pillar,
            slug: normalizeString(key as string),
          });

      startTransition(() => {
        router.push(href);
        onClear();
      });
    }
  };

  return { onAction };
};
