import { z } from 'zod';

import {
  genericResponseSchema,
  infiniteListPageSchema,
} from '@/shared/core/schemas';

export const grantSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  networks: z.array(
    z.object({
      name: z.string(),
      logo: z.string().nullable(),
    }),
  ),
  ecosystem: z.string(),
  totalFunds: z.number(),
  totalDisbursedFunds: z.number(),
  summary: z.string(),
  categories: z.array(z.string()),
  type: z.string(),
  reputations: z.array(
    z.object({ text: z.string(), logo: z.string().nullable() }),
  ),
  logo: z.string().nullable(),
  url: z.string().nullable(),
  twitter: z.string().nullable(),
  discord: z.string().nullable(),
  granteesCount: z.number(),
});
export type Grant = z.infer<typeof grantSchema>;

export const grantDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  status: z.string(),
  socialLinks: z
    .object({
      twitter: z.string().nullable(),
      website: z.string().nullable(),
      discord: z.string().nullable(),
      orgWebsite: z.string().nullable(),
      blog: z.string().nullable(),
      forum: z.string().nullable(),
      grantsSite: z.string().nullable(),
    })
    .nullable(),
  eligibility: z
    .object({
      programId: z.string(),
      description: z.string(),
      requirements: z.array(z.string()),
    })
    .nullable(),
  metadata: z.object({
    amountDistributedToDate: z.number().nullable(),
    title: z.string(),
    description: z.string().nullable(),
    programBudget: z.number().nullable(),
    minGrantSize: z.number().nullable(),
    maxGrantSize: z.number().nullable(),
    grantsToDate: z.number().nullable(),
    website: z.string().nullable(),
    projectTwitter: z.string().nullable(),
    bugBounty: z.string().nullable(),
    categories: z.array(z.string()),
    ecosystems: z.array(z.string()),
    organizations: z.array(z.string()),
    networks: z.array(z.string()),
    grantTypes: z.array(z.string()),
    platformsUsed: z.array(z.string()),
    logoImg: z.string().nullable(),
    bannerImg: z.string().nullable(),
    createdAt: z.number().nullable(),
    type: z.string().nullable(),
    tags: z.array(z.string()),
    amount: z.string().nullable(),
  }),
});
export type GrantDto = z.infer<typeof grantDtoSchema>;

export const grantDetailsDtoSchema = genericResponseSchema.extend({
  data: grantDtoSchema.optional(),
});
export type GrantDetailsDto = z.infer<typeof grantDetailsDtoSchema>;

export const grantInfiniteListPageSchema = infiniteListPageSchema.extend({
  data: z.array(grantSchema),
});
export type GrantInfiniteListPage = z.infer<typeof grantInfiniteListPageSchema>;

export const grantDtoInfiniteListPageSchema = infiniteListPageSchema.extend({
  data: z.array(grantDtoSchema),
});
export type GrantDtoInfiniteListPage = z.infer<
  typeof grantDtoInfiniteListPageSchema
>;

export const fundingEventDtoSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  amountInUsd: z.number().nullable(),
  tokenAmount: z.number().nullable(),
  tokenUnit: z.string().nullable(),
  roundName: z.string().nullable(),
  sourceLink: z.string().nullable().optional(),
  eventType: z.union([
    z.literal('funding'),
    z.literal('grant'),
    z.literal('round'),
  ]),
});
export type FundingEventDto = z.infer<typeof fundingEventDtoSchema>;

export const granteeItemDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string().nullable(),
  slug: z.string(),
  logoUrl: z.string().nullable(),
  fundingEvents: z.array(fundingEventDtoSchema),
});
export type GranteeItemDto = z.infer<typeof granteeItemDtoSchema>;

export const granteeInfiniteListPageDto = z.object({
  page: z.number().optional(),
  data: z.array(granteeItemDtoSchema),
});
export type GranteeInfiniteListPageDto = z.infer<
  typeof granteeInfiniteListPageDto
>;

export const granteeItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logoUrl: z.string().nullable(),
  lastFundingDate: z.number().nullable(),
  lastFundingAmount: z.number().nullable(),
  lastFundingTokenAmount: z.number().nullable(),
  lastFundingTokenUnit: z.string().nullable(),
});
export type GranteeItem = z.infer<typeof granteeItemSchema>;

export const granteeInfiniteListPageSchema = z.object({
  page: z.number().optional(),
  data: z.array(granteeItemSchema),
});
export type GranteeInfiniteListPage = z.infer<
  typeof granteeInfiniteListPageSchema
>;

export const baseStatSchema = z.object({
  label: z.string(),
  value: z.string(),
});

type BaseStat = z.infer<typeof baseStatSchema> & {
  stats?: BaseStat[];
};

export const granteeProjectStatSchema: z.ZodType<BaseStat> =
  baseStatSchema.extend({
    stats: z.lazy(() => granteeProjectStatSchema.array()).optional(),
  });
export type GranteeProjectStat = z.infer<typeof granteeProjectStatSchema>;

export const granteeTabItemSchema = z.object({
  label: z.string(),
  tab: z.string(),
  stats: z.array(granteeProjectStatSchema),
});

export const granteeProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  tabs: z.array(granteeTabItemSchema),
  tags: z.array(z.string()).optional(),
});
export type GranteeProject = z.infer<typeof granteeProjectSchema>;

export const granteeDtoProject = z.object({
  id: z.string(),
  name: z.string(),
  tags: z.array(z.string()),
  tabs: z.array(granteeTabItemSchema),
});
export type GranteeDtoProject = z.infer<typeof granteeDtoProject>;

export const granteeDto = granteeItemDtoSchema.extend({
  status: z.union([
    z.literal('PENDING'),
    z.literal('APPROVED'),
    z.literal('REJECTED'),
    z.literal('CANCELLED'),
    z.literal('IN_REVIEW'),
  ]),
  description: z.string(),
  projects: z.array(granteeDtoProject),
});
export type GranteeDto = z.infer<typeof granteeDto>;

export const granteeDetailsSchema = granteeItemSchema.extend({
  tags: z.array(z.string()).optional(),
  website: z.string().nullable(),
  status: z.string(), // TODO: convert to literals
  description: z.string(),
  projects: z.array(granteeProjectSchema),
});
export type GranteeDetails = z.infer<typeof granteeDetailsSchema>;

export const granteeDetailsResponseSchema = genericResponseSchema.extend({
  data: granteeDto.optional(),
});
export type GranteeDetailsResponse = z.infer<
  typeof granteeDetailsResponseSchema
>;
