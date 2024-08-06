import Link from 'next/link';

import { Avatar, Button } from '@nextui-org/react';

import { Divider } from '@/shared/components/divider';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';

import { GRANT_TEST_IDS } from '@/grants/core/constants';
import { Grant } from '@/grants/core/schemas';
import {
  DetailItemProps,
  DetailItems,
} from '@/grants/components/ui/base/detail-item';
import { DetailValueAmount } from '@/grants/components/ui/base/detail-value-amount';
import { DetailValueAvatars } from '@/grants/components/ui/base/detail-value-avatars';
import { DetailValueTexts } from '@/grants/components/ui/base/detail-value-text';
import { Title } from '@/grants/components/ui/base/title';
import { WebLinks } from '@/grants/components/ui/base/web-links/web-links';

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
    value: (
      <DetailValueTexts
        items={reputations}
        classNames={{ text: 'bg-[#808080]/20 py-0.5 border-none rounded-lg' }}
      />
    ),
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
      className="flex flex-wrap items-center justify-between rounded-2xl bg-gradient-to-r  from-[#0D0D0D] to-[#191919] p-4 text-13 text-white transition-all duration-300 md:p-5 "
      data-uuid={id}
      data-testid={GRANT_TEST_IDS.GRANT_ITEM}
    >
      <div className="flex w-full items-center gap-x-4 pb-6">
        <div className="size-8 shrink-0">
          <Avatar
            classNames={{
              base: 'bg-black w-8 h-8 rounded',
            }}
            showFallback
            src={logo ?? ''}
            name={name}
          />
        </div>
        <Title>{name}</Title>
      </div>

      <div className="flex w-full flex-wrap gap-4">
        <WebLinks links={{ url, discord, twitter }} />

        <DetailItems
          items={topItems}
          classNames={{
            container: 'gap-x-4 gap-y-1.5',
            label: 'pr-2',
          }}
        />

        <DetailItems
          items={midItems}
          classNames={{
            label: 'w-full pb-1 md:pb-0 md:w-auto',
            root: 'w-full md:w-auto',
            container: 'gap-y-3 md:gap-x-6',
          }}
        />

        <DetailItems
          items={lowerItems}
          classNames={{
            root: '',
          }}
        />
      </div>
      <div className="flex w-full pt-4 md:pt-6">
        <Button className="w-full bg-white font-semibold text-black">
          <span>Apply</span>
        </Button>
      </div>
    </Link>
  );
};
