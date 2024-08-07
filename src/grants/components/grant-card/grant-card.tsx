import { Avatar } from '@nextui-org/react';

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

export const GrantCard = ({ grant }: Props) => {
  // TODO: JOB-678

  const { id, name, logo, url, discord, twitter } = grant;

  const topItems = createTopItems(grant);
  const midItems = createMidItems(grant);
  const lowerItems = createLowerItems(grant);

  return (
    <div
      className="to-base-dark/20 flex items-center justify-between gap-6 rounded-b-lg bg-gradient-to-t from-tertiary/20 p-6 text-13 lg:rounded-lg lg:bg-gradient-to-t lg:p-5"
      data-uuid={id}
      data-testid={GRANT_TEST_IDS.GRANT_CARD}
    >
      <div className="flex grow flex-col gap-4 lg:pr-24">
        <Title className="text-2xl font-bold lg:text-32">{name}</Title>
        <div className="flex flex-wrap gap-4">
          <WebLinks links={{ url, discord, twitter }} />
          <DetailItems
            items={topItems}
            classNames={{ container: 'gap-x-4 gap-y-1.5', root: 'text-13' }}
          />
        </div>
        <DetailItems
          items={midItems}
          classNames={{
            label: 'w-full pb-2 md:pb-0 md:w-auto lg:w-full lg:pb-2',
            root: 'w-full md:w-auto first:text-white/75 lg:first:border-0 lg:first:py-0 lg:items-start lg:first:max-w-xl lg:flex-col lg:items-start',
            container:
              'gap-y-4 md:gap-x-6 lg:border-y md:border-t md:border-divider/25 md:pt-4 lg:grow lg:py-4 lg:border-divider/10 lg:w-full',
          }}
        />
        <div className="border-t border-divider/10 pt-4 lg:border-none lg:pt-0">
          <DetailItems
            items={lowerItems}
            classNames={{
              label: 'hidden md:flex',
            }}
          />
        </div>
      </div>

      <div className="hidden flex-col gap-4 lg:flex">
        <div className="flex size-[144px] items-center justify-center overflow-hidden rounded-xl">
          <Avatar
            classNames={{
              base: 'bg-black w-8 h-8 rounded h-[144px] w-[144px]',
            }}
            showFallback
            src={logo ?? ''}
            name={name}
          />
        </div>
      </div>
    </div>
  );
};
