import { Avatar } from '@heroui/avatar';

import { GA_EVENT } from '@/shared/core/constants';
import { cn } from '@/shared/utils/cn';
import { getLogoUrl } from '@/shared/utils/get-logo-url';

import { GRANT_TEST_IDS } from '@/grants/core/constants';
import { Grant } from '@/grants/core/schemas';
import { getGrantCardData } from '@/grants/utils/get-grant-card-data';
import { ViewProgramButton } from '@/grants/components/grant-list/main-cta-button';
import { DetailItems } from '@/grants/components/ui/base/detail-item';
import { Title } from '@/grants/components/ui/base/title';
import { WebLinks } from '@/grants/components/ui/base/web-links';

interface Props {
  grant: Grant;
}

export const FullGrantCard = ({ grant }: Props) => {
  // TODO: JOB-678

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

  return (
    <div
      className="lg:rounded-t-0 from-gradient-1/0 flex max-h-[500px] flex-wrap items-center justify-between gap-6 overflow-hidden rounded-b-lg bg-gradient-to-b to-white/15  p-6 text-13 transition-all duration-700 lg:flex-nowrap lg:rounded-b-20  lg:p-5"
      data-uuid={slug}
      data-testid={GRANT_TEST_IDS.GRANT_CARD}
    >
      <div className="flex grow flex-col gap-4 lg:pr-24">
        <Title className="text-2xl font-bold lg:text-32">{name}</Title>
        <div className="flex flex-wrap gap-4">
          {hasWebLinks && <WebLinks links={{ url, discord, twitter }} />}

          {hasTopItems && (
            <DetailItems
              items={topItems}
              classNames={{ container: 'gap-x-4 gap-y-1.5', root: 'text-13' }}
            />
          )}
        </div>

        <DetailItems
          items={midItems}
          classNames={{
            label: 'w-full pb-2 md:pb-0 md:w-auto lg:w-full lg:pb-2',
            root: 'w-full md:w-auto first:text-white/75 lg:first:border-0 lg:first:py-0 lg:items-start lg:first:max-w-xl lg:flex-col lg:items-start',
            container: cn(
              'gap-y-4 md:gap-x-6 md:border-divider/25 lg:w-full lg:grow lg:border-divider/10 lg:py-4',
              { 'md:border-t md:pt-4': hasTopItems },
            ),
          }}
        />

        {hasLowerItems && (
          <div className="border-t border-divider/10 pt-4 lg:border-none lg:pt-0">
            <DetailItems
              items={lowerItems}
              classNames={{
                label: 'hidden md:flex',
              }}
            />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-4 lg:w-fit">
        <div className="hidden size-[144px] items-center justify-center overflow-hidden rounded-xl lg:flex">
          <Avatar
            classNames={{
              base: 'bg-black w-8 h-8 rounded h-[144px] w-[144px]',
            }}
            showFallback
            src={getLogoUrl(url ?? '', logo)}
            name={name}
          />
        </div>
        <ViewProgramButton
          gaEvent={GA_EVENT.GRANTS.VIEW_PROGRAM}
          slug={slug}
          url={url}
        />
      </div>
    </div>
  );
};
