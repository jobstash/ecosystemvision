import { MW_URL } from '@/shared/core/envs';

export const grantQueryUrls = {
  base: `${MW_URL}/grants`,
  grant: (grantId: string) => `${grantQueryUrls.base}/${grantId}`,
  grantees: (grantId: string) => `${grantQueryUrls.grant(grantId)}/grantees`,
  grantee: (grantId: string, granteeId: string) =>
    `${grantQueryUrls.grantees(grantId)}/${granteeId}`,
  GRANTEE_PROJECT: `${MW_URL}/grantees/project`,
} as const;
