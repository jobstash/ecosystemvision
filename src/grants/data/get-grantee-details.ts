import { mwGET } from '@/shared/utils/mw-get';

import { grantQueryUrls } from '@/grants/core/query-urls';
import {
  GranteeDetails,
  granteeDetailsResponseSchema,
} from '@/grants/core/schemas';
import { dtoToGranteeDetails } from '@/grants/utils/dto-to-grantee-details';

// import { fakeGrantee } from '@/grants/testutils/fake-grantee';

export const getGranteeDetails = async (
  grantId: string,
  granteeId: string,
): Promise<GranteeDetails> => {
  // return {
  //   success: true,
  //   message: 'Grantee details fetched successfully',
  //   data: fakeGrantee(),
  // };

  const response = await mwGET({
    url: `${grantQueryUrls.grantee(grantId, granteeId)}`,
    label: 'getGranteeDetails',
    responseSchema: granteeDetailsResponseSchema,
  });

  if (!response.success || !response.data) {
    throw new Error(response.message);
  }

  return dtoToGranteeDetails(response.data);
};
