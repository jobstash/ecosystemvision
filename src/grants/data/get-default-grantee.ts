import { getGrantDetails } from '@/grants/data/get-grant-details';
import { getGranteeDetails } from '@/grants/data/get-grantee-details';
import { getGranteeList } from '@/grants/data/get-grantee-list';

export const getDefaultGrantee = async (grantId: string) => {
  const grant = await getGrantDetails(grantId);
  const { data: grantees } = await getGranteeList({
    page: 1,
    grantId: grant.id,
  });

  if (grantees.length === 0) return null;
  const { data: firstGrantee } = await getGranteeDetails(grantees[0].id);

  return firstGrantee;
};
