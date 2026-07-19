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

export const fundTeamMemberSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  normalizedName: z.string(),
  jobTitle: z.string().nullable(),
  photoUrl: z.string().nullable(),
  linkedinUrl: z.string().nullable(),
  twitterUrl: z.string().nullable(),
});

export const fundInvestmentRoundSchema = z.object({
  id: z.string().uuid(),
  roundName: z.string(),
  date: z.number(),
  raisedAmount: z.number(),
  sourceLink: z.string().nullable(),
});

export const fundInvestmentSchema = z.object({
  organizationId: z.string(),
  name: z.string(),
  normalizedName: z.string(),
  summary: z.string().nullable(),
  logoUrl: z.string().nullable(),
  website: z.string().nullable(),
  vertical: z.string().nullable(),
  rounds: z.array(fundInvestmentRoundSchema),
});

export const fundDetailsSchema = fundListItemSchema.extend({
  summary: z.string().nullable(),
  description: z.string().nullable(),
  location: z.string().nullable(),
  team: z.array(fundTeamMemberSchema),
  investments: z.array(fundInvestmentSchema),
});

export type FundDetails = z.infer<typeof fundDetailsSchema>;
export type FundTeamMember = z.infer<typeof fundTeamMemberSchema>;
export type FundInvestment = z.infer<typeof fundInvestmentSchema>;
