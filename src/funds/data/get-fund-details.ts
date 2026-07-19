import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { fundDetailsSchema } from '@/funds/core/schemas';

export const getFundDetails = (slug: string) =>
  mwGET({
    url: `${MW_URL}/funds/details/slug/${encodeURIComponent(slug)}`,
    label: 'getFundDetails',
    responseSchema: fundDetailsSchema,
  });
