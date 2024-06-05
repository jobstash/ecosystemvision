import Link from 'next/link';

import { HREFS } from '@/shared/core/constants';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Divider } from '@/shared/components/divider';
import { InfoTags } from '@/shared/components/info-tags';
import { LogoTitle } from '@/shared/components/logo-title';

import { ORG_TEST_IDS } from '@/orgs/core/constants';
import { OrgListItem } from '@/orgs/core/schemas';
import { activeOrgSlugAtom } from '@/orgs/core/atoms';

import { createOrgCardTags } from './create-org-card-tags';

interface Props {
  orgItem: OrgListItem;
  isInit?: boolean;
  filterParamsString?: string;
}

export const OrgCard = (props: Props) => {
  const { orgItem, isInit = false, filterParamsString = '' } = props;
  const { normalizedName: slug, url, logoUrl, name, location } = orgItem;

  const src = getLogoUrl(url, logoUrl);
  const tags = createOrgCardTags(orgItem);
  const hasTags = tags.length > 0;
  const linkHref = `${HREFS.ORGS_PAGE}/${slug}/details${filterParamsString}`;

  return (
    <CardWrapper id={slug} idAtom={activeOrgSlugAtom}>
      <Link
        href={linkHref}
        scroll={false}
        data-testid={ORG_TEST_IDS.ORG_CARD}
        data-uuid={slug}
        data-is-init={isInit ?? undefined}
        prefetch={true}
        className="flex flex-col gap-3 p-6"
      >
        <LogoTitle src={src}>
          <div className="flex flex-col">
            <h3 className="font-lato text-lg font-bold">{name}</h3>
            <h4 className="font-lato text-sm text-white/60">{location}</h4>
          </div>
        </LogoTitle>

        {hasTags && <Divider />}

        <InfoTags tags={tags} />
      </Link>
    </CardWrapper>
  );
};
