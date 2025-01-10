import { PillarParams, PillarSearchParams } from '@/search/core/types';

export const createPillarItemSearchParams = (
  params: PillarParams,
  searchParams: PillarSearchParams,
) => {
  const { include, ...restSearchParams } = searchParams;
  if (!params.pillar) return '';

  const pillarValue = include ? `${params.item},${include}` : params.item;
  return pillarValue
    ? { [params.pillar]: pillarValue, ...restSearchParams }
    : '';
};
