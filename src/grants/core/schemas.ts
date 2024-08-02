import { z } from 'zod';

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
  reputations: z.array(z.string()),
  logo: z.string().nullable(),
  url: z.string().nullable(),
  twitter: z.string().nullable(),
  discord: z.string().nullable(),
  granteesCount: z.number(),
});

export type Grant = z.infer<typeof grantSchema>;

export const granteeSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().nullable(),
  category: z.string(),
  summary: z.string(),
  url: z.string().nullable(),
  lastFunding: z.number(),
  fundingDate: z.number(),
});

export type Grantee = z.infer<typeof granteeSchema>;
