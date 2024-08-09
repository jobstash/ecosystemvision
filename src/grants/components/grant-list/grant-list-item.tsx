import Link from 'next/link';

import { Avatar, Button } from '@nextui-org/react';

import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';

import { GRANT_TEST_IDS } from '@/grants/core/constants';
import { Grant } from '@/grants/core/schemas';
import {
  DetailItemProps,
  DetailItems,
} from '@/grants/components/ui/base/detail-item';
import { DetailValueAmount } from '@/grants/components/ui/base/detail-value-amount';
import { DetailValueAvatars } from '@/grants/components/ui/base/detail-value-avatars';
import { DetailValueTags } from '@/grants/components/ui/base/detail-value-tags';
import { DetailValueTexts } from '@/grants/components/ui/base/detail-value-text';
import { Title } from '@/grants/components/ui/base/title';
import { WebLinks } from '@/grants/components/ui/base/web-links/web-links';
import { CaretRightIcon } from '@/grants/components/ui/icons/caret-right-icon';

const createTopItems = ({
  granteesCount,
  networks,
  ecosystem,
  totalFunds,
  totalDisbursedFunds,
}: Grant): DetailItemProps[] => [
  { icon: <PaperbillIcon />, label: 'Grantees:', value: granteesCount },
  { label: 'Networks:', value: <DetailValueAvatars items={networks} /> },
  { label: 'Ecosystem:', value: ecosystem },
  { label: 'Total Funds:', value: <DetailValueAmount amount={totalFunds} /> },
  {
    label: 'Total Disbursed Funds:',
    value: <DetailValueAmount amount={totalDisbursedFunds} />,
  },
];

const createMidItems = ({
  summary,
  categories,
  type,
}: Grant): DetailItemProps[] => [
  { label: 'Description', value: summary },
  {
    label: 'Categories',
    value: (
      <DetailValueTexts
        items={categories}
        classNames={{
          root: 'text-[#B1FFB1]',
          text: 'border border-[#B1FFB1]',
        }}
      />
    ),
  },
  {
    label: 'Type',
    value: (
      <DetailValueTexts
        items={[type]}
        classNames={{
          root: 'text-[#60BCFF]',
          text: 'border border-[#60BCFF]',
        }}
      />
    ),
  },
];

const createLowerItems = ({ reputations }: Grant): DetailItemProps[] => [
  {
    label: 'Reputations',
    value: <DetailValueTags items={reputations} />,
  },
];

interface Props {
  grant: Grant;
}

export const GrantListItem = ({ grant }: Props) => {
  // TODO: JOB-679

  const { id, name, logo, url, discord, twitter } = grant;

  const href = `/grants/${id}`;

  const topItems = createTopItems(grant);
  const midItems = createMidItems(grant);
  const lowerItems = createLowerItems(grant);

  return (
    <Link
      prefetch
      href={href}
      className="flex flex-wrap items-center justify-between rounded-2xl bg-gradient-to-r  from-[#191919] to-[#0D0D0D] p-4 text-13 text-white transition-all duration-300 md:p-5 lg:flex-nowrap"
      data-uuid={id}
      data-testid={GRANT_TEST_IDS.GRANT_ITEM}
    >
      <div className="lg:pr-12">
        <div className="flex w-full items-center gap-x-4 pb-6">
          <div className="size-8 shrink-0 lg:size-10">
            <Avatar
              classNames={{
                base: 'bg-black w-8 h-8 rounded lg:w-10 lg:h-10',
              }}
              showFallback
              src={logo ?? ''}
              name={name}
            />
          </div>
          <Title className="lg:text-xl">{name}</Title>
        </div>

        <div className="flex w-full flex-wrap gap-4 lg:gap-5">
          <WebLinks links={{ url, discord, twitter }} />

          <DetailItems
            items={topItems}
            classNames={{
              container: 'flex-wrap gap-x-4 gap-y-1.5 lg:gap-x-5',
              label: 'pr-2',
            }}
          />

          <DetailItems
            items={midItems}
            classNames={{
              label: 'w-full pb-2 md:pb-0 md:w-auto lg:w-full lg:pb-2',
              root: 'w-full md:w-auto first:border-y first:border-divider/10 first:py-3 lg:first:border-0 lg:first:py-0 lg:items-start lg:first:max-w-xl lg:flex-col lg:items-start lg:max-w-64',
              container:
                'gap-y-3 md:gap-x-6 lg:border-y lg:grow lg:py-4 lg:border-divider/10 lg:w-full',
            }}
          />

          <DetailItems
            items={lowerItems}
            classNames={{
              label: 'pb-2 md:pb-0',
            }}
          />
        </div>
      </div>
      <div className="flex w-full items-center gap-4 pt-6 lg:max-w-[180px] lg:pt-0">
        <Button className="mx-auto w-full bg-white font-semibold text-black">
          <span>Apply</span>
        </Button>
        <div className="hidden lg:flex">
          <CaretRightIcon />
        </div>
      </div>
    </Link>
  );
};
