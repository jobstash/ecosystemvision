import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import {
  peopleActivityMapSchema,
  peopleAtlasSchema,
  peopleDirectorySchema,
  PeopleMetric,
  peopleOverviewSchema,
  personProfileSchema,
} from '@/people/core/schemas';

const endpoint = (path: string, params: Record<string, string | undefined>) => {
  const url = new URL(`${MW_URL}/people/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
};

export const getPeopleOverview = async (bucket = 'month') =>
  mwGET({
    url: endpoint('overview', { bucket }),
    label: 'getPeopleOverview',
    responseSchema: peopleOverviewSchema,
  });

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
  mwGET({
    url: endpoint('activity-map', {
      metric,
      query,
      page: page.toString(),
      limit: limit.toString(),
    }),
    label: 'getPeopleActivityMap',
    responseSchema: peopleActivityMapSchema,
  });

export const getPeopleAtlas = async ({
  at,
  compareAt,
  organizationKey,
}: {
  at?: string;
  compareAt?: string;
  organizationKey?: string;
} = {}) =>
  mwGET({
    url: endpoint('atlas', { at, compareAt, organizationKey }),
    label: 'getPeopleAtlas',
    responseSchema: peopleAtlasSchema,
  });

export const getPeopleDirectory = async ({
  query,
  organizationKey,
  maintainer,
  current,
  cursor,
}: {
  query?: string;
  organizationKey?: string;
  maintainer?: boolean;
  current?: boolean;
  cursor?: string;
} = {}) =>
  mwGET({
    url: endpoint('directory', {
      query,
      organizationKey,
      maintainer:
        maintainer === undefined ? undefined : maintainer.toString(),
      current: current === undefined ? undefined : current.toString(),
      cursor,
      limit: '50',
    }),
    label: 'getPeopleDirectory',
    responseSchema: peopleDirectorySchema,
  });

export const getPersonProfile = async (login: string) =>
  mwGET({
    url: `${MW_URL}/people/${encodeURIComponent(login)}`,
    label: 'getPersonProfile',
    responseSchema: personProfileSchema,
  });
