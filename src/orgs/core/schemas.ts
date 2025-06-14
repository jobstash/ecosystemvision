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
      url: z.string(),
      projectCount: z.number(),
      lastFundingDate: z.number(),
      lastFundingAmount: z.number(),
      ecosystems: z.array(z.string()),
    }),
  );
export type OrgListItem = z.infer<typeof orgListItemSchema>;

export const orgJobSchema = jobInfoSchema
  .pick({
    id: true,
    title: true,
    shortUUID: true,
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
  .merge(orgInfoSchema);
export type OrgDetails = z.infer<typeof orgDetailsSchema>;

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
