import { mwGET } from '@/shared/utils/mw-get';

import { fundRoundStagesSchema } from '@/funds/core/schemas';

export const getFundRoundStages = (searchParams: Record<string, string>) => {
  const params = new URLSearchParams(searchParams);
  const query = params.size ? `?${params.toString()}` : '';
  return mwGET({
    url: `/api/funds/rounds${query}`,
    label: 'getFundRoundStages',
    responseSchema: fundRoundStagesSchema,
  });
};
