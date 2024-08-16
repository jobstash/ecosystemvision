import { MW_URL } from '@/shared/core/envs';

export const grantQueryUrls = {
  base: `${MW_URL}/grants`,
  grant: (grantId: string) => `${grantQueryUrls.base}/${grantId}`,
  GRANTEE_LIST: `${MW_URL}/grantees/list`,
  GRANTEE_DETAILS: `${MW_URL}/grantees/details`,
  GRANTEE_PROJECT: `${MW_URL}/grantees/project`,
} as const;
