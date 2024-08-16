import { Grant, GrantDto } from '@/grants/core/schemas';

export const dtoToGrant = (dto: GrantDto): Grant => {
  const {
    id,
    name,
    socialLinks,
    metadata: {
      networks,
      ecosystems,
      programBudget,
      amountDistributedToDate,
      description,
      categories,
      type,
      logoImg,
      grantsToDate,
      website,
    },
  } = dto;

  return {
    id,
    name,
    // TODO: ui expects { name: string, logo: string }[], dto is string[]
    networks: networks.length > 0 ? [{ name: networks[0], logo: null }] : [],
    // TODO: ui expects string, dto is string[]
    ecosystem: ecosystems.length > 0 ? ecosystems[0] : '',
    // TODO: which field? programBudget (current), amount, minGrant, maxGrant
    totalFunds: programBudget ?? 0,
    totalDisbursedFunds: amountDistributedToDate ?? 0,
    summary: description ?? '',
    categories,
    type: type ?? '',
    // TODO: where to get this? { text: string, logo: string }[]
    reputations: [],
    logo: logoImg,
    url: website ?? socialLinks?.website ?? socialLinks?.orgWebsite ?? null,
    twitter: socialLinks?.twitter ?? null,
    discord: socialLinks?.discord ?? null,
    granteesCount: grantsToDate ?? 0,
  };
};
