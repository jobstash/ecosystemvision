import { MW_URL } from '@/shared/core/envs';

export const GRANT_TEST_IDS = {
  GRANT_ITEM: 'grant-item',
  GRANT_CARD: 'grant-card',
  GRANTEE_ITEM: 'grantee-item',
} as const;

export const GRANT_QUERY_URLS = {
  GRANT_LIST: `${MW_URL}/grants/list`,
} as const;
