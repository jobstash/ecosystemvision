import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  dtoToPillarInfo,
  pillarInfoResponseSchema,
  TPillarInfo,
} from '@/search/core/schemas';
import { GetPillarInfoProps } from '@/search/core/types';

export const getPillarInfo = async (
  props: GetPillarInfoProps,
): Promise<TPillarInfo> => {
  const { nav, pillar, item, limit } = props;

  const url = new URL(`${MW_URL}/search/pillar`);
  url.searchParams.set('nav', nav);
  if (pillar && item) {
    url.searchParams.set('pillar', pillar);
    url.searchParams.set('item', item);
  }

  if (limit) url.searchParams.set('limit', limit.toString());

  const response = await mwGET({
    url: url.toString(),
    label: 'getPillarInfo',
    responseSchema: pillarInfoResponseSchema,
  });

  if (!response.success) {
    throw new Error(response.message);
  }

  return dtoToPillarInfo(response.data);
};

// import { TPillarInfo } from '@/search/core/schemas';
// import { GetPillarInfoProps } from '@/search/core/types';

// import { fakePillarInfo } from '@/search/testutils/fake-pillar-info';

// export const getPillarInfo = async (
//   props: GetPillarInfoProps,
// ): Promise<TPillarInfo> => {
//   await new Promise((r) => setTimeout(r, 500));
//   return fakePillarInfo(props.limit);
// };
