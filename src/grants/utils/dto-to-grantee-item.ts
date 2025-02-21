import { getLogoUrl } from '@/shared/utils/get-logo-url';

import { GranteeItem, GranteeItemDto } from '@/grants/core/schemas';

export const dtoToGranteeItem = (dto: GranteeItemDto): GranteeItem => {
  if (!dto.fundingEvents.length) {
    return {
      id: dto.id,
      name: dto.name,
      slug: dto.slug,
      logoUrl: dto.logoUrl,
      lastFundingDate: null,
      lastFundingAmount: null,
      lastFundingTokenAmount: null,
      lastFundingTokenUnit: null,
    };
  }

  const lastFunding = dto.fundingEvents.reduce((latest, current) =>
    current.timestamp > latest.timestamp ? current : latest,
  );

  const logo = dto.website === dto.logoUrl ? null : dto.logoUrl;
  const logoUrl = dto.website ? getLogoUrl(dto.website, logo) : null;

  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    logoUrl,
    lastFundingDate: lastFunding.timestamp,
    lastFundingAmount: lastFunding.amountInUsd,
    lastFundingTokenAmount: lastFunding.tokenAmount,
    lastFundingTokenUnit: lastFunding.tokenUnit,
  };
};
