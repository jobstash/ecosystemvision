import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  PillarFiltersItemDto,
  pillarFiltersResponseDto,
} from '@/search/core/schemas';
import { GetPillarFiltersProps } from '@/search/core/types';
import { addMainItemToSearchParams } from '@/search/utils/add-main-item-to-search-params';

export const getPillarFilters = async (
  props: GetPillarFiltersProps,
): Promise<PillarFiltersItemDto[]> => {
  const { nav, params, searchParams } = props;

  const url = new URL(`${MW_URL}/search/pillar/filters`);
  url.searchParams.set('nav', nav);
  url.searchParams.set('pillar', params.pillar);
  url.searchParams.set('item', params.item);

  const updatedSearchParams = addMainItemToSearchParams({
    pillar: params.pillar,
    item: params.item,
    searchParams,
  });

  Object.entries(updatedSearchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await mwGET({
    url: url.toString(),
    label: 'getPillarFilters',
    responseSchema: pillarFiltersResponseDto,
  });

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.data;
};
