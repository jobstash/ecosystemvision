import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { orgTeamDetailsSchema } from '@/orgs/core/schemas';

const TEAM_PAGE_SIZE = 20;

export const getOrgTeam = async (slug: string, page = 1) => {
  const url = new URL(
    `${MW_URL}/organizations/details/slug/${encodeURIComponent(slug)}/team`,
  );
  url.searchParams.set('page', Math.max(1, page).toString());
  url.searchParams.set('limit', TEAM_PAGE_SIZE.toString());

  return mwGET({
    url: url.toString(),
    label: 'getOrgTeam',
    responseSchema: orgTeamDetailsSchema,
  });
};
