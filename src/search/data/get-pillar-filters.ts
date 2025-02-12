import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  PillarFiltersItemDto,
  pillarFiltersResponseDto,
} from '@/search/core/schemas';

interface Options {
  nav: string;
}

export const getPillarFilters = async (
  options: Options,
): Promise<PillarFiltersItemDto[]> => {
  const { nav } = options;

  const url = new URL(`${MW_URL}/search/pillar/filters`);
  url.searchParams.set('nav', nav);

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
