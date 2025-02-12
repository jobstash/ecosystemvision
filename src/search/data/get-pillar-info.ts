import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  dtoToPillarInfo,
  pillarInfoResponseSchema,
  TPillarInfo,
} from '@/search/core/schemas';
import { GetPillarInfoProps } from '@/search/core/types';
import { addMainItemToSearchParams } from '@/search/utils/add-main-item-to-search-params';

const buildPillarInfoURL = (props: GetPillarInfoProps) => {
  const { nav, pillar, item, limit, searchParams } = props;

  const url = new URL(`${MW_URL}/search/pillar`);
  url.searchParams.set('nav', nav);

  let updatedSearchParams = { ...searchParams };

  if (pillar && item) {
    url.searchParams.set('pillar', pillar);
    url.searchParams.set('item', item);

    updatedSearchParams = addMainItemToSearchParams({
      pillar,
      item,
      searchParams,
    });
  }

  if (limit) url.searchParams.set('limit', limit.toString());

  Object.entries(updatedSearchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
};

export const getPillarInfo = async (
  props: GetPillarInfoProps,
): Promise<TPillarInfo> => {
  const url = buildPillarInfoURL(props);

  const response = await mwGET({
    url,
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
