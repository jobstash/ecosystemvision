import { mwGET } from '@/shared/utils/mw-get';

import { grantQueryUrls } from '@/grants/core/query-urls';
import { granteeDtoSchema } from '@/grants/core/schemas';

import { fakeGrantee } from '@/grants/testutils/fake-grantee';

export const getGranteeDetails = async (grantId: string, granteeId: string) => {
  return {
    success: true,
    message: 'Grantee details fetched successfully',
    data: fakeGrantee(),
  };

  return mwGET({
    url: `${grantQueryUrls.grantee(grantId, granteeId)}`,
    label: 'getGranteeDetails',
    responseSchema: granteeDtoSchema,
    options: { next: { revalidate: 3600 } },
  });
};
