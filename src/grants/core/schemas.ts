import { z } from 'zod';

import {
  genericResponseSchema,
  infiniteListPageSchema,
} from '@/shared/core/schemas';

export const grantSchema = z.object({
  id: z.string(),
  name: z.string(),
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
  data: grantDtoSchema,
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

export const granteeSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().nullable(),
  category: z.string(),
  summary: z.string(),
  url: z.string().nullable(),
  lastFunding: z.number(),
  fundingDate: z.number(),
  projects: z.array(z.string()),
});
export type Grantee = z.infer<typeof granteeSchema>;

export const granteeDTOSchema = genericResponseSchema.extend({
  data: granteeSchema,
});
export type GranteeDTO = z.infer<typeof granteeDTOSchema>;

export const granteeListQueryPageSchema = z.object({
  page: z.number().optional(),
  data: z.array(granteeSchema),
});
export type GranteeListQueryPage = z.infer<typeof granteeListQueryPageSchema>;

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
});
export type GranteeProject = z.infer<typeof granteeProjectSchema>;

export const granteeProjectDTOSchema = genericResponseSchema.extend({
  data: granteeProjectSchema,
});
export type GranteeProjectDTO = z.infer<typeof granteeProjectDTOSchema>;
