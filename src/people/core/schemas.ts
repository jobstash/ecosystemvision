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
  activePeople: z.number().nullable(),
  activeMaintainers: z.number().nullable(),
  activeLeads: z.number().nullable(),
  activeOrganizations: z.number().nullable(),
  joins: z.number().nullable(),
  exits: z.number().nullable(),
  returns: z.number().nullable(),
  movements: z.number().nullable(),
  activityCount: z.number().nullable(),
  commitCount: z.number().nullable(),
  mergeCount: z.number().nullable(),
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
  currentValue: z.number().nullable(),
  change: z.number().nullable(),
  totalValue: z.number().nullable(),
  series: z.array(z.object({ period: z.string(), value: z.number().nullable() })),
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
  activePeople: z.number().nullable(),
  activeMaintainers: z.number().nullable(),
  series: z.array(
    z.object({
      period: z.string(),
      activePeople: z.number().nullable(),
      activeMaintainers: z.number().nullable(),
    }),
  ),
});

export const peopleAtlasSchema = z.object({
  available: z.boolean(),
  asOf: z.string().nullable(),
  fromPeriod: z.string().nullable(),
  toPeriod: z.string().nullable(),
  focusOrganizationKey: z.string().nullable(),
  totalMovements: z.number().nullable(),
  visibleMovements: z.number().nullable(),
  organizations: z.array(peopleFlowOrganizationSchema),
  flows: z.array(
    z.object({
      period: z.string(),
      sourceOrganizationKey: z.string(),
      destinationOrganizationKey: z.string(),
      people: z.number(),
      maintainerMovements: z.number().nullable(),
    }),
  ),
});
export type PeopleAtlas = z.infer<typeof peopleAtlasSchema>;
export type PeopleAtlasNode = z.infer<typeof peopleFlowOrganizationSchema>;
