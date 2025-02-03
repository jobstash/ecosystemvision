import React from 'react';

import { createSocialsInfoTagProps } from '@/shared/utils/create-socials-info-tag-props';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { DetailsHeader } from '@/shared/components/details-header';

import { OrgDetails } from '@/orgs/core/schemas';
import { createOrgInfoTagProps } from '@/orgs/components/utils/create-org-info-tag-props';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsHeader = ({ org }: Props) => {
  const { name, logoUrl, website, summary } = org;
  const src = getLogoUrl(website!, logoUrl);
  const infoTags = createOrgInfoTagProps(org);
  const socials = createSocialsInfoTagProps(org, { website: false });
  const tags = [...infoTags, ...socials];

  return <DetailsHeader src={src} name={name} summary={summary} tags={tags} />;
};
