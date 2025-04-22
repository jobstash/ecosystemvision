import { Grant, GrantDto } from '@/grants/core/schemas';

export const dtoToGrant = (dto: GrantDto): Grant => {
  const { id, name, slug, socialLinks, metadata } = dto;

  const networks =
    metadata && metadata.networks.length > 0
      ? [{ name: metadata.networks[0], logo: null }]
      : [];

  const ecosystem =
    metadata && metadata.ecosystems.length > 0 ? metadata.ecosystems[0] : '';

  return {
    id,
    name,
    slug,
    // TODO: ui expects { name: string, logo: string }[], dto is string[]
    networks,
    // TODO: ui expects string, dto is string[]
    ecosystem,
    // TODO: which field? programBudget (current), amount, minGrant, maxGrant
    totalFunds: metadata?.programBudget ?? 0,
    totalDisbursedFunds: metadata?.amountDistributedToDate ?? 0,
    summary: metadata?.description ?? '',
    categories: metadata?.categories ?? [],
    type: metadata?.type ?? '',
    // TODO: where to get this? { text: string, logo: string }[]
    reputations: [],
    logo: metadata?.logoImg ?? null,
    url:
      metadata?.website ??
      socialLinks?.website ??
      socialLinks?.orgWebsite ??
      null,
    twitter: socialLinks?.twitter ?? null,
    discord: socialLinks?.discord ?? null,
    granteesCount: metadata?.grantsToDate ?? 0,
  };
};
