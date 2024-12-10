import { PillarSearchParams } from '@/search/core/types';

interface Props {
  itemSlug: string;
  pillarParamKey: 'include' | string;
  isActive: boolean;
  searchParams: PillarSearchParams;
}

export const createToggledPillarItemSearchParam = (props: Props) => {
  const { itemSlug, pillarParamKey, isActive, searchParams } = props;

  const newSearchParams = { ...searchParams };

  const items = newSearchParams[pillarParamKey]?.split(',') || [];

  if (isActive) {
    const filteredItems = items.filter((item) => item !== itemSlug);

    filteredItems.length > 0
      ? (newSearchParams[pillarParamKey] = filteredItems.join(','))
      : delete newSearchParams[pillarParamKey];
  } else {
    newSearchParams[pillarParamKey] = [...items, itemSlug].join(',');
  }

  return newSearchParams;
};
