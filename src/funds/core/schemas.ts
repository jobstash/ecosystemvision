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
  socialStaffCount: z.number(),
  portfolioCount: z.number(),
  totalInvestedCapital: z.number().nullable(),
  knownRoundCapital: z.number().nullable(),
  knownRoundCount: z.number(),
  valuationRoundCount: z.number(),
  investmentRoundCount: z.number(),
  ambiguousRoundCount: z.number(),
  soloRoundCount: z.number(),
  syndicatedRoundCount: z.number(),
  soloRate: z.number().nullable(),
  progressedCompanyCount: z.number(),
  progressionRate: z.number().nullable(),
  stageProgressedCompanyCount: z.number(),
  stageTrackedCompanyCount: z.number(),
  stageProgressionRate: z.number().nullable(),
  followOnRoundCapital: z.number().nullable(),
  medianRoundSizeStepUp: z.number().nullable(),
  roundSizeStepUpSample: z.number(),
  medianValuationStepUp: z.number().nullable(),
  valuationStepUpSample: z.number(),
  topSectors: z.array(
    z.object({
      name: z.string(),
      companyCount: z.number(),
    }),
  ),
  lastInvestmentDate: z.number().nullable(),
  jobCount: z.number(),
  activityWindow: z.enum([
    '30d',
    '90d',
    '6m',
    '1y',
    '2y',
    '5y',
    'all',
    'custom',
  ]),
  activityFromDate: z.number().nullable(),
  activityToDate: z.number(),
  roundStages: z.array(z.string()),
});

export type FundListItem = z.infer<typeof fundListItemSchema>;

export const fundListPageSchema = infiniteListPageSchema.extend({
  data: z.array(fundListItemSchema),
});

export const fundSectorSchema = z.object({
  name: z.string(),
  companyCount: z.number(),
});

export const fundSectorsSchema = z.array(fundSectorSchema);

export const fundRoundStageSchema = z.object({
  slug: z.string(),
  name: z.string(),
  fundCount: z.number(),
  investmentCount: z.number(),
});

export const fundRoundStagesSchema = z.array(fundRoundStageSchema);

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
  investedAmount: z.number().nullable(),
  valuation: z.number().nullable(),
  investorCount: z.number(),
  fundParticipated: z.boolean(),
  investmentRole: z.enum(['recorded-solo', 'co-investor']).nullable(),
  sourceLink: z.string().nullable(),
  source: z.string().nullable(),
});

export const fundInvestmentSchema = z.object({
  organizationId: z.string(),
  name: z.string(),
  normalizedName: z.string(),
  summary: z.string().nullable(),
  logoUrl: z.string().nullable(),
  website: z.string().nullable(),
  vertical: z.string().nullable(),
  sectors: z.array(z.string()),
  rounds: z.array(fundInvestmentRoundSchema),
});

export const fundJobSchema = z.object({
  id: z.string(),
  title: z.string(),
  shortUUID: z.string(),
  organizationName: z.string(),
  location: z.string().nullable(),
  commitment: z.string().nullable(),
  publishedTimestamp: z.number().nullable(),
});

export const fundDetailsSchema = fundListItemSchema.extend({
  summary: z.string().nullable(),
  description: z.string().nullable(),
  location: z.string().nullable(),
  team: z.array(fundTeamMemberSchema),
  investments: z.array(fundInvestmentSchema),
  jobs: z.array(fundJobSchema),
});

export type FundDetails = z.infer<typeof fundDetailsSchema>;
export type FundTeamMember = z.infer<typeof fundTeamMemberSchema>;
export type FundInvestment = z.infer<typeof fundInvestmentSchema>;
export type FundJob = z.infer<typeof fundJobSchema>;
