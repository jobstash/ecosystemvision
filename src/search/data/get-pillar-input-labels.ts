import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { pillarInputLabelsResponseDtoSchema } from '@/search/core/schemas';

export const getPillarInputLabels = async (
  inputs: { slug: string; href: string }[],
) => {
  const url = new URL(`${MW_URL}/search/pillar/input-labels`);
  url.searchParams.set('inputs', inputs.join(','));

  const response = await mwGET({
    url: url.toString(),
    label: 'getPillarInputLabels',
    responseSchema: pillarInputLabelsResponseDtoSchema,
  });

  // await new Promise((r) => setTimeout(r, 1000));
  // const response = {
  //   data: [
  //     { slug: 'dexes', label: 'Dexes' },
  //     { slug: 'bnb-smart-chain', label: 'BNB Smart Chain' },
  //     { slug: 'open-source', label: 'Open Source' },
  //     { slug: 'okexchain', label: 'OKExChain' },
  //     { slug: 'ftx-ventures', label: 'FTX Ventures' },
  //   ],
  // };

  const results: { slug: string; href: string; label: string | null }[] = [];
  for (const { slug, href } of inputs) {
    const matched = response.data.find((item) => item.slug === slug);
    results.push({ slug, href, label: matched ? matched.label : null });
  }

  return results;
};