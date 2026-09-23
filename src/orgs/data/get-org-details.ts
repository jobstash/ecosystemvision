import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { suppressOrganizationIntelligence } from '@/orgs/core/public-aggregation';
import { orgDetailsSchema } from '@/orgs/core/schemas';
import { organizationDetailsPath } from '@/orgs/utils/organization-route';

const label = 'getOrgDetails';

export const getOrgDetails = async (slug: string) => {
  const url = `${MW_URL}${organizationDetailsPath(slug)}`;

  return suppressOrganizationIntelligence(
    await mwGET({
      url,
      label,
      responseSchema: orgDetailsSchema,
    }),
  );
};
