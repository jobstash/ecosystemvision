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
  { icon: <PaperbillIcon />, label: 'Grantees', value: granteesCount },
  { label: 'Networks', value: <DetailValueAvatars items={networks} /> },
  { label: 'Ecosystem', value: ecosystem },
  { label: 'Total Funds', value: <DetailValueAmount amount={totalFunds} /> },
  {
    label: 'Total Disbursed Funds',
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
        classNames={{ text: 'bg-white/10 border-none rounded-lg' }}
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
      className=" flex flex-wrap items-center justify-between rounded-2xl bg-gradient-to-r  from-[#191919] to-[#0D0D0D] p-4 text-13 text-white transition-all duration-300 "
      data-uuid={id}
      data-testid={GRANT_TEST_IDS.GRANT_ITEM}
    >
      <div className="flex gap-x-4 pb-6">
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

      <div className="flex flex-wrap gap-y-3 pb-3">
        <WebLinks links={{ url, discord, twitter }} />
        <DetailItems items={topItems} />
        <Divider />
      </div>

      
      <DetailItems items={midItems} />
      
      
      <DetailItems items={lowerItems} />

      <div className="flex w-full items-center justify-center">
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary">
            <span>Apply</span>
          </Button>
        </div>
      </div>
    </Link>
  );
};
