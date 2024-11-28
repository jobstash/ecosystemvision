import { capitalize } from '@/shared/utils/capitalize';

export const createAllItemsLabel = (pillarSlug: string) =>
  `All ${capitalize(pillarSlug, true)}`;
