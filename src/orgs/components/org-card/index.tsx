import Link from 'next/link';

import { HREFS } from '@/shared/core/constants';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Divider } from '@/shared/components/divider';
import { InfoTags } from '@/shared/components/info-tags';
import { LogoTitle } from '@/shared/components/logo-title';

import { ORG_TEST_IDS } from '@/orgs/core/constants';
import { OrgListItem } from '@/orgs/core/schemas';
import { organizationRouteKey } from '@/orgs/utils/organization-route';
import { activeOrgSlugAtom } from '@/orgs/core/atoms';
import { OrganizationIntelligenceBadges } from '@/orgs/components/organization-intelligence-badges';

import { createOrgCardTags } from './create-org-card-tags';

interface Props {
  orgItem: OrgListItem;
  isInit?: boolean;
  filterParamsString?: string;
}

export const OrgCard = (props: Props) => {
  const { orgItem, isInit = false, filterParamsString = '' } = props;
  const { url, logoUrl, name, location, summary } = orgItem;

  const slug = organizationRouteKey(orgItem);
  const src = getLogoUrl(url, logoUrl);
  const tags = createOrgCardTags(orgItem);
  const hasTags = tags.length > 0;
  // const href = `${HREFS.ORGS_PAGE}/names/${slug}/details${filterParamsString}`;
  const href = `${HREFS.ORGS_PAGE}/info/${slug}${filterParamsString}`;

  return (
    <CardWrapper id={slug} idAtom={activeOrgSlugAtom}>
      <Link
        href={href}
        data-testid={ORG_TEST_IDS.ORG_CARD}
        data-uuid={slug}
        data-is-init={isInit ?? undefined}
        prefetch={false}
        className="flex flex-col gap-3 p-6"
      >
        <LogoTitle src={src} name={name}>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">{name}</h3>
            <h4 className="text-sm text-white/60">{location}</h4>
          </div>
        </LogoTitle>

        {summary && (
          <>
            <p className="text-sm text-white/80">{summary}</p>
          </>
        )}

        <OrganizationIntelligenceBadges isCompact intelligence={orgItem} />

        {hasTags && (
          <>
            <Divider />
            <InfoTags tags={tags} />
          </>
        )}
      </Link>
    </CardWrapper>
  );
};
