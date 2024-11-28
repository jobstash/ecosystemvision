import { normalizeString } from '@/shared/utils/normalize-string';

export const findPillarItem = (
  items: string[] | undefined,
  param: string | undefined,
) =>
  items && param
    ? items.find((item) => normalizeString(item) === param)
    : undefined;
