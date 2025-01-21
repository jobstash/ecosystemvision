import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { pillarInputLabelsResponseDtoSchema } from '@/search/core/schemas';

interface Options {
  nav: string;
  pillars: string;
  slugs: string;
}

export const getPillarLabels = async ({ nav, pillars, slugs }: Options) => {
  if (!pillars.length || !slugs.length) {
    throw new Error('Pillars and slugs are required');
  }

  const url = new URL(`${MW_URL}/search/pillar/labels`);
  url.searchParams.set('nav', nav);
  url.searchParams.set('pillars', pillars);
  url.searchParams.set('slugs', slugs);

  const response = await mwGET({
    url: url.toString(),
    label: 'getPillarLabels',
    responseSchema: pillarInputLabelsResponseDtoSchema,
  });

  return response.data;
};
