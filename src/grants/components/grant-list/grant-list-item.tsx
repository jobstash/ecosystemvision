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
import { CaretRightIcon } from '@/grants/components/ui/icons/caret-right-icon';

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
          text: 'border-2 border-[#B1FFB1]',
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
          text: 'border-2 border-[#60BCFF]',
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
      className="flex items-center justify-between gap-6 rounded-lg bg-white/5 p-6 transition-all duration-300 hover:bg-white/10"
      data-uuid={id}
      data-testid={GRANT_TEST_IDS.GRANT_ITEM}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="size-10">
            <Avatar showFallback radius="sm" src={logo ?? ''} name={name} />
          </div>
          <Title>{name}</Title>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <WebLinks links={{ url, discord, twitter }} />
          <DetailItems items={topItems} />
        </div>

        <Divider />
        <DetailItems items={midItems} />
        <Divider />
        <DetailItems items={lowerItems} />
      </div>

      <div className="flex size-40 items-center justify-center">
        <div className="flex items-center gap-4">
          <Button color="primary">
            <span>Apply</span>
          </Button>
          <CaretRightIcon />
        </div>
      </div>
    </Link>
  );
};
