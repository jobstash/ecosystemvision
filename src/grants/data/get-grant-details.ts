import { mwGET } from '@/shared/utils/mw-get';

import { GRANT_QUERY_URLS } from '@/grants/core/constants';
import { grantDTOSchema } from '@/grants/core/schemas';

export const getGrantDetails = async (grantId: string) => {
  return mwGET({
    url: `${GRANT_QUERY_URLS.GRANT_DETAILS}/${grantId}`,
    label: 'getGrant',
    responseSchema: grantDTOSchema,
    options: { next: { revalidate: 3600 } },
  });
};
