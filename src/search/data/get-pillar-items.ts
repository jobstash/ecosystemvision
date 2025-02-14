import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { pillarItemsResponseDtoSchema } from '@/search/core/schemas';
import { GetPillarItemsProps } from '@/search/core/types';
import { addMainItemToSearchParams } from '@/search/utils/add-main-item-to-search-params';

const createPillarItemsSearchParams = (props: GetPillarItemsProps) => {
  const {
    nav,
    pillar,
    page = 1,
    limit = 20,
    query,
    params,
    searchParams: initialSearchParams,
  } = props;

  const searchParams = new URLSearchParams({
    nav,
    pillar,
    page: `${page}`,
    limit: `${limit}`,
  });

  if (query) searchParams.set('query', query);

  if (initialSearchParams) {
    const updatedSearchParams = addMainItemToSearchParams({
      pillar: params.pillar,
      item: params.item,
      searchParams: initialSearchParams,
    });

    Object.entries(updatedSearchParams).forEach(([key, value]) => {
      searchParams.set(key, value);
    });
  }

  return searchParams.toString();
};

export const getPillarItems = async (
  props: GetPillarItemsProps,
): Promise<{ items: string[]; total: number }> => {
  const url = new URL(`${MW_URL}/search/pillar/items`);
  url.search = createPillarItemsSearchParams(props);

  const { total, data: items } = await mwGET({
    url: url.toString(),
    label: 'getPillarItems',
    responseSchema: pillarItemsResponseDtoSchema,
  });

  return { items, total };
};

// import { GetPillarItemsProps } from '@/search/core/types';

// import { fakePillarItems } from '@/search/testutils/fake-pillar-items';

// export const getPillarItems = async (
//   _props: GetPillarItemsProps,
// ): Promise<string[]> => {
//   await new Promise((r) => setTimeout(r, 500));
//   return fakePillarItems();
// };
