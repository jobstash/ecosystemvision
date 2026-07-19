import { z } from 'zod';

import { infiniteListPageSchema } from '@/shared/core/schemas';

export const fundListItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  normalizedName: z.string(),
  logoUrl: z.string().nullable(),
  website: z.string().nullable(),
  twitter: z.string().nullable(),
  staffCount: z.number(),
  portfolioCount: z.number(),
});

export type FundListItem = z.infer<typeof fundListItemSchema>;

export const fundListPageSchema = infiniteListPageSchema.extend({
  data: z.array(fundListItemSchema),
});

export type FundListPage = z.infer<typeof fundListPageSchema>;
