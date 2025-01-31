import { Avatar } from '@heroui/avatar';

import { GA_EVENT } from '@/shared/core/constants';
import { cn } from '@/shared/utils/cn';
import { getLogoUrl } from '@/shared/utils/get-logo-url';

import { GRANT_TEST_IDS } from '@/grants/core/constants';
import { Grant } from '@/grants/core/schemas';
import { getGrantCardData } from '@/grants/utils/get-grant-card-data';
import { ApplyButton } from '@/grants/components/grant-list/apply-button';
import { GrantListItemLinkWrapper } from '@/grants/components/grant-list/grant-list-item-link-wrapper';
import { ViewImpactButton } from '@/grants/components/grant-list/view-impact-button';
import { DetailItems } from '@/grants/components/ui/base/detail-item';
import { Title } from '@/grants/components/ui/base/title';
import { WebLinks } from '@/grants/components/ui/base/web-links/web-links';
import { CaretRightIcon } from '@/grants/components/ui/icons/caret-right-icon';

interface Props {
  grant: Grant;
  isLink?: boolean;
  isInfo?: boolean;
  ctaText?: string;
  isAiResult?: boolean;
}

export const GrantListItem = ({
  grant,
  isLink = true,
  isInfo,
  ctaText,
  isAiResult,
}: Props) => {
  const {
    slug,
    logo,
    name,
    url,
    discord,
    twitter,
    topItems,
    hasTopItems,
    midItems,
    lowerItems,
    hasLowerItems,
    hasWebLinks,
  } = getGrantCardData(grant);

  const gaEvent = ctaText
    ? isAiResult
      ? GA_EVENT.GRANTS.APPLY_AI_ACTIVE_GRANT
      : GA_EVENT.GRANTS.APPLY_ACTIVE_GRANT
    : GA_EVENT.GRANTS.VIEW_PROGRAM;

  const wrapperClassName =
    'flex flex-wrap items-center justify-between rounded-2xl bg-gradient-to-r  from-[#191919] to-[#0D0D0D] p-4 text-13 text-white transition-all duration-300 md:p-5 lg:flex-nowrap';

  const content = (
    <>
      <div className="lg:pr-12">
        <div className="flex w-full items-center gap-x-4 pb-6">
          <div className="size-8 shrink-0 lg:size-10">
            <Avatar
              classNames={{
                base: 'bg-black w-8 h-8 rounded lg:w-10 lg:h-10',
              }}
              showFallback
              src={getLogoUrl(url ?? '', logo)}
              name={name}
            />
          </div>
          <Title className="lg:text-xl">{name}</Title>
        </div>

        <div className="flex w-full flex-wrap gap-4 lg:gap-5">
          {hasWebLinks && <WebLinks links={{ url, discord, twitter }} />}

          {hasTopItems && (
            <DetailItems
              items={topItems}
              classNames={{
                container: 'flex-wrap gap-x-4 gap-y-1.5 lg:gap-x-5',
                label: 'pr-2',
              }}
            />
          )}

          <DetailItems
            items={midItems}
            classNames={{
              label: 'w-full pb-2 md:pb-0 md:w-auto lg:w-full lg:pb-2',
              root: 'w-full md:w-auto first:border-y first:border-divider/10 first:py-3 lg:first:border-0 lg:first:py-0 lg:items-start lg:first:max-w-xl lg:flex-col lg:items-start lg:max-w-64',
              container: cn(
                'gap-y-3 md:gap-x-6 lg:w-full lg:grow lg:border-divider/10',
                { 'lg:border-t lg:pt-4': hasTopItems },
                { 'lg:border-b lg:pb-4': hasLowerItems },
              ),
            }}
          />

          {hasLowerItems && (
            <DetailItems
              items={lowerItems}
              classNames={{
                label: 'pb-2 md:pb-0',
              }}
            />
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-end gap-4 pt-6 md:flex-row lg:max-w-[180px] lg:pt-0">
        <ApplyButton url={url} text={ctaText} gaEvent={gaEvent} value={slug} />

        {!ctaText && <ViewImpactButton slug={slug} />}

        <div className="hidden lg:flex">
          <CaretRightIcon />
        </div>
      </div>
    </>
  );

  if (isLink || isInfo) {
    return (
      <GrantListItemLinkWrapper slug={slug} isInfo={isInfo}>
        {content}
      </GrantListItemLinkWrapper>
    );
  }

  return (
    <div
      className={wrapperClassName}
      data-uuid={slug}
      data-testid={GRANT_TEST_IDS.GRANT_ITEM}
    >
      {content}
    </div>
  );
};
