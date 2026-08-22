import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  suppressPeopleActivityMap,
  suppressPeopleAtlas,
  suppressPeopleOverview,
} from '@/people/core/public-aggregation';
import {
  peopleActivityMapSchema,
  peopleAtlasSchema,
  PeopleMetric,
  peopleOverviewSchema,
} from '@/people/core/schemas';

const endpoint = (path: string, params: Record<string, string | undefined>) => {
  const url = new URL(`${MW_URL}/people/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
};

export const getPeopleOverview = async (bucket = 'month') =>
  suppressPeopleOverview(
    await mwGET({
      url: endpoint('overview', { bucket }),
      label: 'getPeopleOverview',
      responseSchema: peopleOverviewSchema,
    }),
  );

export const getPeopleActivityMap = async ({
  metric = 'activePeople',
  query,
  page = 1,
  limit = 250,
}: {
  metric?: PeopleMetric;
  query?: string;
  page?: number;
  limit?: number;
} = {}) =>
  suppressPeopleActivityMap(
    await mwGET({
      url: endpoint('activity-map', {
        metric,
        query,
        page: page.toString(),
        limit: limit.toString(),
      }),
      label: 'getPeopleActivityMap',
      responseSchema: peopleActivityMapSchema,
    }),
  );

export const getPeopleAtlas = async ({
  at,
  organizationKey,
  windowMonths = 36,
}: {
  at?: string;
  organizationKey?: string;
  windowMonths?: number;
} = {}) =>
  suppressPeopleAtlas(
    await mwGET({
      url: endpoint('atlas', {
        at,
        organizationKey,
        windowMonths: windowMonths.toString(),
      }),
      label: 'getPeopleAtlas',
      responseSchema: peopleAtlasSchema,
    }),
  );
