import { getGrantDetails } from '@/grants/data/get-grant-details';
import { getGranteeDetails } from '@/grants/data/get-grantee-details';
import { getGranteesList } from '@/grants/data/get-grantees-list';

export const getDefaultGrantee = async (grantId: string) => {
  const { data: grant } = await getGrantDetails(grantId);
  const { data: grantees } = await getGranteesList({
    page: 1,
    grantId: grant.id,
  });

  if (grantees.length === 0) return null;
  const { data: firstGrantee } = await getGranteeDetails(grantees[0].id);

  return firstGrantee;
};
