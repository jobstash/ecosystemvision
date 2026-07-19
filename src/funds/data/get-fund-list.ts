import { PAGE_SIZE } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { fundListPageSchema } from '@/funds/core/schemas';

export const getFundList = (
  page: number,
  searchParams: Record<string, string>,
) => {
  const params = new URLSearchParams({
    ...searchParams,
    limit: PAGE_SIZE,
    page: String(page),
  });

  return mwGET({
    url: `/api/funds/list?${params.toString()}`,
    label: 'getFundList',
    responseSchema: fundListPageSchema,
  });
};
