import { mwGET } from '@/shared/utils/mw-get';

import { grantQueryUrls } from '@/grants/core/query-urls';
import { granteeDTOSchema } from '@/grants/core/schemas';

export const getGranteeDetails = async (granteeId: string) => {
  return mwGET({
    url: `${grantQueryUrls.GRANTEE_DETAILS}/${granteeId}`,
    label: 'getGranteeDetails',
    responseSchema: granteeDTOSchema,
    options: { next: { revalidate: 3600 } },
  });
};
