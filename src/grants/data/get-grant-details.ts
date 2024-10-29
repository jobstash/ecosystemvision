import { errMsg } from '@/shared/core/errors';
import { mwGET } from '@/shared/utils/mw-get';

import { grantQueryUrls } from '@/grants/core/query-urls';
import { Grant, grantDetailsDtoSchema } from '@/grants/core/schemas';
import { dtoToGrant } from '@/grants/utils/dto-to-grant';

export const getGrantDetails = async (grantId: string): Promise<Grant> => {
  const response = await mwGET({
    url: grantQueryUrls.grant(grantId),
    label: 'getGrant',
    responseSchema: grantDetailsDtoSchema,
  });

  if (!response.success) {
    throw new Error(response.message);
  }

  if (!response.data) {
    throw new Error(errMsg.NOT_FOUND);
  }

  return dtoToGrant(response.data);
};
