import { Divider } from '@/shared/components/divider';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';

import { GRANT_TEST_IDS } from '@/grants/core/constants';
import { Grant } from '@/grants/core/types';
import {
  DetailItemProps,
  DetailItems,
} from '@/grants/components/ui/base/detail-item';
import { DetailValueAmount } from '@/grants/components/ui/base/detail-value-amount';
import { DetailValueAvatars } from '@/grants/components/ui/base/detail-value-avatars';
import { DetailValueTexts } from '@/grants/components/ui/base/detail-value-text';
import { Title } from '@/grants/components/ui/base/title';
import { WebLinks } from '@/grants/components/ui/base/web-links';

const createTopItems = ({
  grantees,
  networks,
  ecosystem,
  totalFunds,
  totalDisbursedFunds,
}: Grant): DetailItemProps[] => [
  { icon: <PaperbillIcon />, label: 'Grantees', value: grantees.length },
  { label: 'Networks', value: <DetailValueAvatars items={networks} /> },
  { label: 'Ecosystem', value: ecosystem },
  { label: 'Total Funds', value: <DetailValueAmount amount={totalFunds} /> },
  {
    label: 'Total Disbursed Funds',
    value: <DetailValueAmount amount={totalDisbursedFunds} />,
  },
];

const createMidItems = ({ summary, categories, type }: Grant) => [
  { value: summary },
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

export const GrantCard = ({ grant }: Props) => {
  // TODO: JOB-678

  const { id, name, logo, url, discord, twitter } = grant;

  const topItems = createTopItems(grant);
  const midItems = createMidItems(grant);
  const lowerItems = createLowerItems(grant);

  return (
    <div
      className="flex items-center justify-between gap-6 rounded-lg bg-gradient-to-l from-[#0D0D0D] to-primary p-6"
      data-uuid={id}
      data-testid={GRANT_TEST_IDS.GRANT_CARD}
    >
      <div className="flex flex-col gap-4">
        <Title>{name}</Title>
        <DetailItems items={topItems} />
        <Divider />
        <DetailItems items={midItems} />
        <Divider />
        <DetailItems items={lowerItems} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex size-32 items-center justify-center bg-white/5">
          <span>LOGO HERE: {logo}</span>
        </div>
        <WebLinks links={{ url, discord, twitter }} />
      </div>
    </div>
  );
};
