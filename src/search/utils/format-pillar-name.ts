import { capitalize } from '@/shared/utils/capitalize';

export const formatPillarName = (pillar: string, nav: string) =>
  pillar === 'names' ? `Popular ${capitalize(nav)}` : capitalize(pillar);
