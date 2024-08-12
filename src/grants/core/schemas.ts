import { z } from 'zod';

import { genericResponseSchema } from '@/shared/core/schemas';

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

export const grantDTOSchema = genericResponseSchema.extend({
  data: grantSchema,
});
export type GrantDTO = z.infer<typeof grantDTOSchema>;

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

export const grantListQueryPageSchema = z.object({
  page: z.number().optional(),
  data: z.array(grantSchema),
});
export type GrantListQueryPage = z.infer<typeof grantListQueryPageSchema>;

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

export const granteeStatSchema: z.ZodType<BaseStat> = baseStatSchema.extend({
  stats: z.lazy(() => granteeStatSchema.array()).optional(),
});
export type GranteeStat = z.infer<typeof granteeStatSchema>;

export const granteeTabItemSchema = z.object({
  label: z.string(),
  tab: z.string(),
  stats: z.array(granteeStatSchema),
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
