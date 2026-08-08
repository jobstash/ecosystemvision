import React from 'react';

import { createSocialsInfoTagProps } from '@/shared/utils/create-socials-info-tag-props';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { DetailsHeader } from '@/shared/components/details-header';

import { OrgDetails } from '@/orgs/core/schemas';
import { createOrgInfoTagProps } from '@/orgs/components/utils/create-org-info-tag-props';
import { OrganizationIntelligenceBadges } from '@/orgs/components/organization-intelligence-badges';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsHeader = ({ org }: Props) => {
  const { name, logoUrl, website, summary } = org;
  const src = getLogoUrl(website!, logoUrl);
  const infoTags = createOrgInfoTagProps(org);
  const socialTags = createSocialsInfoTagProps(org, { website: false });

  return (
    <div className="flex flex-col gap-4">
      <DetailsHeader
        src={src}
        name={name}
        summary={summary}
        infoTags={infoTags}
        socialTags={socialTags}
      />
      <OrganizationIntelligenceBadges intelligence={org} />
      {org.teamCoverageStatus === 'current' && org.teamSignalsAsOf ? (
        <p className="text-xs text-white/45">
          Maintainer signals as of {formatAsOf(org.teamSignalsAsOf)}
        </p>
      ) : null}
    </div>
  );
};

const formatAsOf = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};
