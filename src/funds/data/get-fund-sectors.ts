import { mwGET } from '@/shared/utils/mw-get';

import { fundSectorsSchema } from '@/funds/core/schemas';

export const getFundSectors = (searchParams: Record<string, string>) => {
  const params = new URLSearchParams(searchParams);
  const query = params.size ? `?${params.toString()}` : '';
  return mwGET({
    url: `/api/funds/sectors${query}`,
    label: 'getFundSectors',
    responseSchema: fundSectorsSchema,
  });
};
