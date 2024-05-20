import { capitalize } from './capitalize';

export const createCommonInfoTagText = (classification: string | null) => {
  if (!classification) return null;

  const sanitized = classification.replaceAll('_', ' ');

  return capitalize(sanitized, true);
};
