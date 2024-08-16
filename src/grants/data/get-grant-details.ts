import { mwGET } from '@/shared/utils/mw-get';

import { grantQueryUrls } from '@/grants/core/query-urls';
import { Grant, grantDetailsDtoSchema } from '@/grants/core/schemas';
import { dtoToGrant } from '@/grants/utils/dto-to-grant';

export const getGrantDetails = async (grantId: string): Promise<Grant> => {
  const response = await mwGET({
    url: `${grantQueryUrls.base}/${grantId}`,
    label: 'getGrant',
    responseSchema: grantDetailsDtoSchema,
    options: { next: { revalidate: 3600 } },
  });

  if (!response.success) {
    throw new Error(response.message);
  }

  return dtoToGrant(response.data);
};
