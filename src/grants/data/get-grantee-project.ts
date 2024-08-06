import { mwGET } from '@/shared/utils/mw-get';

import { GRANT_QUERY_URLS } from '@/grants/core/constants';
import { granteeProjectDTOSchema } from '@/grants/core/schemas';

export const getGranteeProject = async (projectId: string) => {
  return mwGET({
    url: `${GRANT_QUERY_URLS.GRANTEE_PROJECT}/${projectId}`,
    label: 'getGranteeProject',
    responseSchema: granteeProjectDTOSchema,
    options: { next: { revalidate: 3600 } },
  });
};
