import { Organization, WithContext } from 'schema-dts';

import { getLogoUrl } from '@/shared/utils/get-logo-url';

import { OrgDetails } from '@/orgs/core/schemas';

export const createOrgJsonLd = (org: OrgDetails): Organization => {
  const jsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    description: org.description,
  };

  if (org.website) {
    jsonLd.url = org.website;
    jsonLd.logo = getLogoUrl(org.website, org.logoUrl);
  }

  if (org.headcountEstimate) {
    jsonLd.numberOfEmployees = {
      '@type': 'QuantitativeValue',
      value: org.headcountEstimate,
    };
  }

  const sameAs: string[] = [];
  if (org.discord) sameAs.push(org.discord);
  if (org.docs) sameAs.push(org.docs);
  if (org.github) sameAs.push(`https://github.com/${org.github}`);
  if (org.telegram) sameAs.push(`https://t.me/${org.telegram}`);
  if (org.twitter) sameAs.push(`https://twitter.com/${org.twitter}`);
  if (org.website) sameAs.push(org.website);
  if (sameAs.length) jsonLd.sameAs = sameAs;

  if (org.aggregateRating && org.reviewCount) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: org.aggregateRating,
      reviewCount: org.reviewCount,
    };
  }

  return jsonLd;
};
