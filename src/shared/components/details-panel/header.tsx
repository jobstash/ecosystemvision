import { OrgInfo } from '@/shared/core/schemas';
import { createSocialsInfoTagProps } from '@/shared/utils/create-socials-info-tag-props';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { InfoTags } from '@/shared/components/info-tags';
import { LogoTitle } from '@/shared/components/logo-title';
import { Text } from '@/shared/components/text';

import { createOrgInfoTagProps } from '@/orgs/components/utils/create-org-info-tag-props';

interface Props {
  org: OrgInfo;
}

export const DetailsPanelHeader = ({ org }: Props) => {
  const { name, logoUrl, website, summary } = org;
  const src = getLogoUrl(website!, logoUrl);
  const tags = createOrgInfoTagProps(org);
  const socials = createSocialsInfoTagProps(org, { website: false });

  return (
    <div className="flex flex-col gap-4">
      <LogoTitle src={src} name={name} />
      <InfoTags isDraggable isCompact tags={tags} />
      <Text text={summary} />
      <InfoTags isDraggable isCompact tags={socials} />
    </div>
  );
};
