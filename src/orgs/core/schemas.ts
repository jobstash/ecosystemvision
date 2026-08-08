import { z } from 'zod';

import {
  fundingRoundSchema,
  grantFundingSchema,
  infiniteListPageSchema,
  investorSchema,
  jobInfoSchema,
  jobInfoTagsSchema,
  orgInfoSchema,
  projectAllInfoSchema,
  tagSchema,
} from '@/shared/core/schemas';

import { ORG_REVIEW_LOCATIONS, ORG_REVIEW_TIMEZONES } from './constants';

export const organizationIntelligenceSchema = z.object({
  fundingStage: z.string().nullable().optional().default(null),
  recentlyFunded: z.boolean().optional().default(false),
  teamCoverageStatus: z
    .enum(['current', 'unknown'])
    .nullable()
    .optional()
    .default(null),
  teamSignalsAsOf: z.string().nullable().optional().default(null),
  currentMaintainerCount: z.number().nullable().optional().default(null),
  activeLeadCount: z.number().nullable().optional().default(null),
  newActiveLeadCount: z.number().nullable().optional().default(null),
  steppedDownLeadCount: z.number().nullable().optional().default(null),
  movedLeadCount: z.number().nullable().optional().default(null),
  earlyLeadDepartureCount: z.number().nullable().optional().default(null),
  growingTeam: z.boolean().nullable().optional().default(null),
  shrinkingTeam: z.boolean().nullable().optional().default(null),
  earlyTeamShrinkage: z.boolean().nullable().optional().default(null),
});
export type OrganizationIntelligence = z.infer<
  typeof organizationIntelligenceSchema
>;

export const orgListItemSchema = orgInfoSchema
  .pick({
    orgId: true,
    name: true,
    normalizedName: true,
    location: true,
    headcountEstimate: true,
    logoUrl: true,
    aggregateRating: true,
    reviewCount: true,
    summary: true,
  })
  .merge(
    z.object({
      url: z.string().nullable(),
      projectCount: z.number(),
      lastFundingDate: z.number(),
      lastFundingAmount: z.number(),
      ecosystems: z.array(z.string()),
    }),
  )
  .merge(organizationIntelligenceSchema);
export type OrgListItem = z.infer<typeof orgListItemSchema>;

export const orgJobSchema = jobInfoSchema
  .pick({
    id: true,
    title: true,
    shortUUID: true,
    timestamp: true,
    summary: true,
  })
  .merge(jobInfoTagsSchema);
export type OrgJob = z.infer<typeof orgJobSchema>;

const starRatingSchema = z.number().min(0).max(5).nullable();
export type StarRating = z.infer<typeof starRatingSchema>;

export const orgRatingSchema = z.object({
  benefits: starRatingSchema,
  careerGrowth: starRatingSchema,
  diversityInclusion: starRatingSchema,
  management: starRatingSchema,
  product: starRatingSchema,
  compensation: starRatingSchema,
  onboarding: starRatingSchema,
  workLifeBalance: starRatingSchema,
});
export type OrgRating = z.infer<typeof orgRatingSchema>;

export const orgCompensationSchema = z.object({
  offersTokenAllocation: z.boolean(),
  salary: z.number().nullable(),
  currency: z.string().nullable(),
});
export type OrgCompensation = z.infer<typeof orgCompensationSchema>;

export const orgReviewLocationSchema = z.enum(ORG_REVIEW_LOCATIONS);
export type OrgReviewLocation = z.infer<typeof orgReviewLocationSchema>;

export const orgReviewTimezoneSchema = z.enum(ORG_REVIEW_TIMEZONES);
export type OrgReviewTimezone = z.infer<typeof orgReviewTimezoneSchema>;

export const orgStaffReviewSchema = z.object({
  id: z.string().min(1).nullable(),
  title: z.string().nullable(),
  location: orgReviewLocationSchema.nullable(),
  timezone: orgReviewTimezoneSchema.nullable(),
  pros: z.string().min(1).max(500).nullable(),
  cons: z.string().min(1).max(500).nullable(),
});
export type OrgStaffReview = z.infer<typeof orgStaffReviewSchema>;

export const orgReviewSchema = z.object({
  membershipStatus: z.string().min(1).nullable(),
  startDate: z.number().nullable(),
  endDate: z.number().nullable(),
  reviewedTimestamp: z.number().nullable(),
  commitCount: z.number().nullable(),
  compensation: orgCompensationSchema,
  rating: orgRatingSchema,
  review: orgStaffReviewSchema,
});
export type OrgReview = z.infer<typeof orgReviewSchema>;

export const orgDetailsSchema = z
  .object({
    projects: z.array(projectAllInfoSchema),
    fundingRounds: z.array(fundingRoundSchema),
    investors: z.array(investorSchema),
    grants: z.array(grantFundingSchema),
    jobs: z.array(orgJobSchema),
    aggregateRating: starRatingSchema,
    aggregateRatings: orgRatingSchema,
    reviewCount: z.number(),
    reviews: z.array(orgReviewSchema.omit({ compensation: true })),
    tags: z.array(tagSchema),
  })
  .merge(orgInfoSchema)
  .merge(organizationIntelligenceSchema);
export type OrgDetails = z.infer<typeof orgDetailsSchema>;

const orgTeamPageSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    page: z.number(),
    count: z.number(),
    total: z.number(),
    data: z.array(itemSchema),
  });

export const orgMaintainerSchema = z.object({
  githubUserId: z.string(),
  login: z.string(),
  firstMergeAt: z.string().optional(),
  lastMergeAt: z.string().optional(),
  mergeCount: z.number().optional(),
  currentEmployee: z.boolean().optional(),
  currentMaintainer: z.boolean().optional(),
  activeLead: z.boolean().optional(),
  earlyMaintainer: z.boolean().optional(),
  firstWriteAt: z.string(),
  qualifiedAt: z.string(),
  lastWriteAt: z.string(),
  writeOperations: z.number(),
  current: z.boolean(),
  earlyCohort: z.boolean(),
});
export type OrgMaintainer = z.infer<typeof orgMaintainerSchema>;

export const orgMaintainerMovementSchema = z.object({
  githubUserId: z.string(),
  login: z.string(),
  destinationOrganizationId: z.string(),
  destinationOrganizationName: z.string(),
  destinationOrganizationSlug: z.string(),
  sourceLastMergeAt: z.string().optional(),
  destinationFirstMergeAt: z.string().optional(),
  sourceLastWriteAt: z.string(),
  destinationFirstWriteAt: z.string(),
  confirmedAt: z.string(),
  earlyMaintainer: z.boolean().optional(),
  earlyCohort: z.boolean(),
  status: z.enum(['active', 'observed', 'returned', 'superseded']),
  returnedAt: z.string().nullable(),
});
export type OrgMaintainerMovement = z.infer<typeof orgMaintainerMovementSchema>;

export const orgTeamDetailsSchema = z.object({
  organizationId: z.string(),
  organizationName: z.string(),
  coverageStatus: z.enum(['current', 'unknown']).nullable(),
  asOf: z.string().nullable(),
  currentMaintainerCount: z.number().nullable(),
  activeLeadCount: z.number().nullable().optional().default(null),
  newActiveLeadCount: z.number().nullable().optional().default(null),
  steppedDownLeadCount: z.number().nullable().optional().default(null),
  movedLeadCount: z.number().nullable().optional().default(null),
  earlyLeadDepartureCount: z.number().nullable().optional().default(null),
  newMaintainerCount: z.number().nullable(),
  movedMaintainerCount: z.number().nullable(),
  earlyMovedMaintainerCount: z.number().nullable(),
  growingTeam: z.boolean().nullable(),
  shrinkingTeam: z.boolean().nullable(),
  earlyTeamShrinkage: z.boolean().nullable(),
  githubOrganizations: z.array(z.string()),
  maintainers: orgTeamPageSchema(orgMaintainerSchema),
  movements: orgTeamPageSchema(orgMaintainerMovementSchema),
});
export type OrgTeamDetails = z.infer<typeof orgTeamDetailsSchema>;

export const orgInfiniteListPageSchema = infiniteListPageSchema.extend({
  data: z.array(orgListItemSchema),
});
export type OrgInfiniteListPage = z.infer<typeof orgInfiniteListPageSchema>;

export const orgSearchInfiniteListPageSchema = infiniteListPageSchema.extend({
  data: z.array(orgListItemSchema),
});
export type OrgSearchInfiniteListPage = z.infer<
  typeof orgSearchInfiniteListPageSchema
>;
