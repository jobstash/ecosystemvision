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
import { WebLinks } from '@/grants/components/ui/base/web-links';

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
      className="to-base-dark/20 flex items-center justify-between gap-6 rounded-b-lg bg-gradient-to-tr from-tertiary/20 p-6 text-13 lg:rounded-lg lg:bg-gradient-to-t"
      data-uuid={id}
      data-testid={GRANT_TEST_IDS.GRANT_CARD}
    >
      <div className="flex flex-col gap-4">
        <Title className="text-2xl font-bold lg:text-32">{name}</Title>
        <div className="flex flex-wrap">
          <WebLinks
            links={{ url, discord, twitter }}
          />
          <DetailItems items={topItems} />
        </div>
        <DetailItems items={midItems} />
        <DetailItems items={lowerItems} />
      </div>

      <div className="hidden flex-col gap-4 lg:flex">
        <div className="flex size-32 items-center justify-center bg-white/5">
          <span>LOGO HERE: {logo}</span>
        </div>
      </div>
    </div>
  );
};
