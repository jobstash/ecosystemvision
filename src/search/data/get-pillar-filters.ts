import { MW_URL } from '@/shared/core/envs';
import { getMappedNavParam } from '@/shared/utils/get-mapped-nav-param';
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
  url.searchParams.set('nav', getMappedNavParam(nav));

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
    kind: 'SINGLE_SELECT' as const,
    paramKey: 'audits',
    options: [
      { label: 'Has Audits', value: true },
      { label: 'Has No Audits', value: false },
    ],
  },
  {
    position: 3,
    label: 'Hacks',
    googleAnalyticsEventName: 'hacks',
    kind: 'SINGLE_SELECT' as const,
    paramKey: 'hacks',
    options: [
      { label: 'Has been hacked', value: true },
      { label: 'Has not been hacked', value: false },
    ],
  },
  {
    position: 4,
    label: 'Has Token',
    googleAnalyticsEventName: 'has-token',
    kind: 'SINGLE_SELECT' as const,
    paramKey: 'has-token',
    options: [
      { label: 'Has Token', value: true },
      { label: 'Has No Token', value: false },
    ],
  },
];
