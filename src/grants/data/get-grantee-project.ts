import { mwGET } from '@/shared/utils/mw-get';

import { grantQueryUrls } from '@/grants/core/query-urls';
import { granteeProjectDTOSchema } from '@/grants/core/schemas';

export const getGranteeProject = async (projectId: string) => {
  return mwGET({
    url: `${grantQueryUrls.GRANTEE_PROJECT}/${projectId}`,
    label: 'getGranteeProject',
    responseSchema: granteeProjectDTOSchema,
    options: { next: { revalidate: 3600 } },
  });
};
