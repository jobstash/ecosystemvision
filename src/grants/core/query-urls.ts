import { MW_URL } from '@/shared/core/envs';

export const grantQueryUrls = {
  base: `${MW_URL}/grants`,
  grant: (grantId: string) => `${grantQueryUrls.base}/${grantId}`,
  grantees: (grantId: string) => `${grantQueryUrls.grant(grantId)}/grantees`,
  GRANTEE_DETAILS: `${MW_URL}/grantees/details`,
  GRANTEE_PROJECT: `${MW_URL}/grantees/project`,
} as const;
