import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  PillarFiltersItemDto,
  pillarFiltersResponseDto,
} from '@/search/core/schemas';

interface Options {
  nav: string;
}

export const getPillarFilters = async (
  options: Options,
): Promise<PillarFiltersItemDto[]> => {
  const { nav } = options;

  await new Promise((r) => setTimeout(r, 1000));
  return dummyFilters;

  const url = new URL(`${MW_URL}/search/pillar/filters`);
  url.searchParams.set('nav', nav);

  const response = await mwGET({
    url: url.toString(),
    label: 'getPillarFilters',
    responseSchema: pillarFiltersResponseDto,
  });

  if (!response.success) {
    throw new Error(response.message);
  }

  return response.data;
};

const dummyFilters = [
  {
    position: 0,
    label: 'Order',
    googleAnalyticsEventName: 'order',
    kind: 'ORDER' as const,
    paramKey: 'order',
    options: [
      { label: 'A-Z', value: 'asc' },
      { label: 'Z-A', value: 'desc' },
    ],
  },
  {
    position: 0,
    label: 'Order By',
    googleAnalyticsEventName: 'orderBy',
    kind: 'ORDER_BY' as const,
    paramKey: 'orderBy',
    options: [
      { label: 'Monthly Fees', value: 'monthly-fees' },
      { label: 'Monthly Revenue', value: 'monthly-revenue' },
      { label: 'Monthly Volume', value: 'monthly-volume' },
      { label: 'TVL', value: 'tvl' },
      { label: 'Number of Audits', value: 'number-of-audits' },
      { label: 'Number of Chains', value: 'number-of-chains' },
      { label: 'Number of Hacks', value: 'number-of-hacks' },
    ],
  },
  {
    position: 1,
    label: 'TVL',
    googleAnalyticsEventName: 'tvl',
    kind: 'RANGE' as const,
    paramKey: 'tvl',
    min: { value: 0, paramKey: 'min-tvl' },
    max: { value: 100_000_000_000, paramKey: 'max-tvl' },
    prefix: '$',
  },
  {
    position: 2,
    label: 'Audits',
    googleAnalyticsEventName: 'audits',
    kind: 'MULTI_SELECT' as const,
    paramKey: 'audits',
    options: [
      { label: 'Has Audits', value: 'has-audits' },
      { label: 'Has No Audits', value: 'no-audits' },
    ],
  },
  {
    position: 3,
    label: 'Hacks',
    googleAnalyticsEventName: 'hacks',
    kind: 'MULTI_SELECT' as const,
    paramKey: 'hacks',
    options: [
      { label: 'Has been hacked', value: 'hacked' },
      { label: 'Has not been hacked', value: 'not-hacked' },
    ],
  },
  {
    position: 4,
    label: 'Has Token',
    googleAnalyticsEventName: 'has-token',
    kind: 'MULTI_SELECT' as const,
    paramKey: 'has-token',
    options: [
      { label: 'Has Token', value: 'has-token' },
      { label: 'Has No Token', value: 'has-no-token' },
    ],
  },
];
