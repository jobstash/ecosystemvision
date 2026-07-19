import { mwGET } from '@/shared/utils/mw-get';

import { fundSectorsSchema } from '@/funds/core/schemas';

export const getFundSectors = () =>
  mwGET({
    url: '/api/funds/sectors',
    label: 'getFundSectors',
    responseSchema: fundSectorsSchema,
  });
