import { mwGET } from '@/shared/utils/mw-get';

import { GRANT_QUERY_URLS } from '@/grants/core/constants';
import { granteeDTOSchema } from '@/grants/core/schemas';

export const getGranteeDetails = async (granteeId: string) => {
  return mwGET({
    url: `${GRANT_QUERY_URLS.GRANTEE_DETAILS}/${granteeId}`,
    label: 'getGranteeDetails',
    responseSchema: granteeDTOSchema,
    options: { next: { revalidate: 3600 } },
  });
};
