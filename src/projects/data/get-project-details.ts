import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { projectDetailsSchema } from '@/projects/core/schemas';

export const getProjectDetails = (slug: string) => {
  const url = `${MW_URL}/projects/details/slug/${slug}`;

  return mwGET({
    url,
    label,
    responseSchema: projectDetailsSchema,
  });
};

const label = 'getProjectDetails';
