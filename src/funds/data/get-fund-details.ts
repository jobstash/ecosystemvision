import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { fundDetailsSchema } from '@/funds/core/schemas';

export const getFundDetails = (
  slug: string,
  searchParams: Record<string, string> = {},
) => {
  const params = new URLSearchParams();
  ['activityWindow', 'fromDate', 'toDate', 'rounds', 'sector'].forEach(
    (key) => {
      const value = searchParams[key];
      if (value) params.set(key, value);
    },
  );
  const query = params.size ? `?${params.toString()}` : '';
  return mwGET({
    url: `${MW_URL}/funds/details/slug/${encodeURIComponent(slug)}${query}`,
    label: 'getFundDetails',
    responseSchema: fundDetailsSchema,
  });
};
