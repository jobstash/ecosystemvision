import { z } from 'zod';

export const peopleMetricSchema = z.enum([
  'activePeople',
  'affiliatedPeople',
  'activeMaintainers',
  'activeLeads',
  'joins',
  'exits',
  'movements',
  'activity',
  'commits',
  'merges',
]);
export type PeopleMetric = z.infer<typeof peopleMetricSchema>;

const overviewPointSchema = z.object({
  period: z.string(),
  activePeople: z.number(),
  activeMaintainers: z.number(),
  activeLeads: z.number(),
  activeOrganizations: z.number(),
  joins: z.number(),
  exits: z.number(),
  returns: z.number(),
  movements: z.number(),
  activityCount: z.number(),
  commitCount: z.number(),
  mergeCount: z.number(),
});

export const peopleOverviewSchema = z.object({
  available: z.boolean(),
  asOf: z.string().nullable(),
  bucket: z.enum(['month', 'quarter', 'year']),
  points: z.array(overviewPointSchema),
});
export type PeopleOverview = z.infer<typeof peopleOverviewSchema>;

export const peopleActivityMapRowSchema = z.object({
  organizationKey: z.string(),
  organizationId: z.string().nullable(),
  organizationName: z.string(),
  organizationSlug: z.string(),
  logoUrl: z.string().nullable(),
  githubOrganizations: z.array(z.string()),
  currentValue: z.number(),
  change: z.number(),
  totalValue: z.number(),
  series: z.array(z.object({ period: z.string(), value: z.number() })),
});

export const peopleActivityMapSchema = z.object({
  available: z.boolean(),
  asOf: z.string().nullable(),
  metric: peopleMetricSchema,
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  rows: z.array(peopleActivityMapRowSchema),
});
export type PeopleActivityMap = z.infer<typeof peopleActivityMapSchema>;
export type PeopleActivityMapRow = z.infer<typeof peopleActivityMapRowSchema>;

export const peopleFlowOrganizationSchema = z.object({
  organizationKey: z.string(),
  organizationId: z.string().nullable(),
  organizationName: z.string(),
  organizationSlug: z.string(),
  logoUrl: z.string().nullable(),
  githubOrganizations: z.array(z.string()),
  activePeople: z.number(),
  activeMaintainers: z.number(),
  series: z.array(
    z.object({
      period: z.string(),
      activePeople: z.number(),
      activeMaintainers: z.number(),
    }),
  ),
});

export const peopleAtlasSchema = z.object({
  available: z.boolean(),
  asOf: z.string().nullable(),
  fromPeriod: z.string().nullable(),
  toPeriod: z.string().nullable(),
  focusOrganizationKey: z.string().nullable(),
  totalMovements: z.number(),
  visibleMovements: z.number(),
  organizations: z.array(peopleFlowOrganizationSchema),
  flows: z.array(
    z.object({
      period: z.string(),
      sourceOrganizationKey: z.string(),
      destinationOrganizationKey: z.string(),
      people: z.number(),
      maintainerMovements: z.number(),
    }),
  ),
});
export type PeopleAtlas = z.infer<typeof peopleAtlasSchema>;
export type PeopleAtlasNode = z.infer<typeof peopleFlowOrganizationSchema>;

export const peopleDirectoryItemSchema = z.object({
  personId: z.string(),
  login: z.string(),
  displayName: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  githubUrl: z.string().nullable(),
  firstActivityAt: z.string(),
  lastActivityAt: z.string(),
  activityCount: z.number(),
  commitCount: z.number(),
  mergeCount: z.number(),
  organizationCount: z.number(),
  maintainerOrganizationCount: z.number(),
  current: z.boolean(),
  maintainer: z.boolean(),
  activeLead: z.boolean(),
  currentOrganizationKey: z.string(),
  currentOrganizationId: z.string().nullable(),
  currentOrganizationName: z.string(),
  currentOrganizationSlug: z.string(),
  currentOrganizationLogoUrl: z.string().nullable(),
  concurrentOrganizationKeys: z.array(z.string()),
});
export type PeopleDirectoryItem = z.infer<typeof peopleDirectoryItemSchema>;

export const peopleDirectorySchema = z.object({
  available: z.boolean(),
  asOf: z.string().nullable(),
  count: z.number(),
  nextCursor: z.string().nullable(),
  data: z.array(peopleDirectoryItemSchema),
});
export type PeopleDirectory = z.infer<typeof peopleDirectorySchema>;

export const personProfileSchema = peopleDirectoryItemSchema.extend({
  episodes: z.array(
    z.object({
      organizationKey: z.string(),
      organizationId: z.string().nullable(),
      organizationName: z.string(),
      organizationSlug: z.string(),
      logoUrl: z.string().nullable(),
      episodeNumber: z.number(),
      startedAt: z.string(),
      lastActivityAt: z.string(),
      exitedAt: z.string(),
      activityCount: z.number(),
      commitCount: z.number(),
      mergeCount: z.number(),
      maintainer: z.boolean(),
      current: z.boolean(),
      returned: z.boolean(),
    }),
  ),
  movements: z.array(
    z.object({
      sourceOrganizationKey: z.string(),
      sourceOrganizationName: z.string(),
      sourceOrganizationSlug: z.string(),
      destinationOrganizationKey: z.string(),
      destinationOrganizationName: z.string(),
      destinationOrganizationSlug: z.string(),
      sourceLastActivityAt: z.string(),
      destinationFirstActivityAt: z.string(),
      confirmedAt: z.string(),
      involvesMaintainer: z.boolean(),
      status: z.enum(['active', 'observed']),
    }),
  ),
  activity: z.array(
    z.object({
      period: z.string(),
      organizationKey: z.string(),
      organizationName: z.string(),
      activityCount: z.number(),
      commitCount: z.number(),
      mergeCount: z.number(),
      maintainer: z.boolean(),
      activeLead: z.boolean(),
    }),
  ),
  maintainerSupport: z.array(
    z.object({
      organizationKey: z.string(),
      organizationId: z.string().nullable(),
      organizationName: z.string(),
      organizationSlug: z.string(),
      mergedPrCount: z.number(),
      internalAuthorsSupported: z.number(),
      currentInternalAuthorsSupported: z.number(),
      firstSupportedMergeAt: z.string(),
      lastSupportedMergeAt: z.string(),
      internalAuthorLogins: z.array(z.string()),
    }),
  ),
});
export type PersonProfile = z.infer<typeof personProfileSchema>;
