import { MW_URL, PAGE_SIZE } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { fundListPageSchema } from '@/funds/core/schemas';

export const getFundList = (page: number) =>
  mwGET({
    url: `${MW_URL}/funds/list?page=${page}&limit=${PAGE_SIZE}`,
    label: 'getFundList',
    responseSchema: fundListPageSchema,
  });
