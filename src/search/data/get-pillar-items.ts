import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { pillarItemsResponseDtoSchema } from '@/search/core/schemas';
import { GetPillarItemsProps } from '@/search/core/types';

export const getPillarItems = async (
  props: GetPillarItemsProps,
): Promise<string[]> => {
  const { nav, pillar, query, page = 1, limit = 20 } = props;

  const url = new URL(`${MW_URL}/search/pillar/items`);
  const searchParams = new URLSearchParams({
    nav,
    pillar,
    page: `${page}`,
    limit: `${limit}`,
  });
  if (query) searchParams.set('query', query);
  url.search = searchParams.toString();

  const response = await mwGET({
    url: url.toString(),
    label: 'getPillarItems',
    responseSchema: pillarItemsResponseDtoSchema,
  });

  return response.data;
};

// import { GetPillarItemsProps } from '@/search/core/types';

// import { fakePillarItems } from '@/search/testutils/fake-pillar-items';

// export const getPillarItems = async (
//   _props: GetPillarItemsProps,
// ): Promise<string[]> => {
//   await new Promise((r) => setTimeout(r, 500));
//   return fakePillarItems();
// };
