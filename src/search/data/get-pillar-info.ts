import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  dtoToPillarSearchResults,
  pillarInfoResponseSchema,
  TPillarInfo,
} from '@/search/core/schemas';
import { GetPillarInfoProps } from '@/search/core/types';

export const getPillarInfo = async (
  props: GetPillarInfoProps,
): Promise<TPillarInfo> => {
  const { nav, pillar, item, pillar2, item2 } = props;

  const url = new URL(`${MW_URL}/search/pillar`);
  url.searchParams.set('nav', nav);
  url.searchParams.set('pillar', pillar);
  url.searchParams.set('item', item);

  if (typeof pillar2 === 'string' && typeof item2 === 'string') {
    url.searchParams.set('pillar2', pillar2);
    url.searchParams.set('item2', item2);
  }

  const response = await mwGET({
    url: url.toString(),
    label: 'getPillarInfo',
    responseSchema: pillarInfoResponseSchema,
  });

  if (!response.success) {
    throw new Error(response.message);
  }

  return dtoToPillarSearchResults(response.data);
};
