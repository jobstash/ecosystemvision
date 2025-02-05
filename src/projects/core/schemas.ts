import { z } from 'zod';

import {
  fundingRoundSchema,
  grantFundingSchema,
  infiniteListPageSchema,
  investorSchema,
  orgInfoSchema,
  projectAllInfoSchema,
  projectInfoSchema,
  tagSchema,
} from '@/shared/core/schemas';

export const projectInfiniteListPageSchema = infiniteListPageSchema.extend({
  data: z.array(projectInfoSchema),
});

export type ProjectInfiniteListPage = z.infer<
  typeof projectInfiniteListPageSchema
>;

export const projectOrgSchema = z
  .object({
    fundingRounds: z.array(fundingRoundSchema),
    investors: z.array(investorSchema),
    tags: z.array(tagSchema),
    aggregateRating: z.number().min(0).max(5),
    reviewCount: z.number(),
  })
  .merge(orgInfoSchema);

export type ProjectOrg = z.infer<typeof projectOrgSchema>;

export const projectDetailsSchema = z
  .object({
    organizations: z.array(projectOrgSchema),
    grants: z.array(grantFundingSchema),
  })
  .merge(projectAllInfoSchema);

export type ProjectDetails = z.infer<typeof projectDetailsSchema>;
