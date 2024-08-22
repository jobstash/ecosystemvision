import { conditionalItem } from '@/shared/utils/conditional-item';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';
import { MarkdownContent } from '@/shared/components/markdown-content';

import { Grant } from '@/grants/core/schemas';
import { DetailItemProps } from '@/grants/components/ui/base/detail-item';
import { DetailValueAmount } from '@/grants/components/ui/base/detail-value-amount';
import { DetailValueAvatars } from '@/grants/components/ui/base/detail-value-avatars';
import { DetailValueTags } from '@/grants/components/ui/base/detail-value-tags';
import { DetailValueTexts } from '@/grants/components/ui/base/detail-value-text';

const createTopItems = ({
  granteesCount,
  networks,
  ecosystem,
  totalFunds,
  totalDisbursedFunds,
}: Grant): DetailItemProps[] => [
  ...conditionalItem(granteesCount > 0, {
    icon: <PaperbillIcon />,
    label: 'Grantees:',
    value: granteesCount,
  }),
  ...conditionalItem(networks.length > 0, {
    label: 'Networks:',
    value: <DetailValueAvatars items={networks} />,
  }),
  ...conditionalItem(!!ecosystem, { label: 'Ecosystem:', value: ecosystem }),
  ...conditionalItem(totalFunds > 0, {
    label: 'Total Funds:',
    value: <DetailValueAmount amount={totalFunds} />,
  }),
  ...conditionalItem(totalDisbursedFunds > 0, {
    label: 'Total Disbursed Funds:',
    value: <DetailValueAmount amount={totalDisbursedFunds} />,
  }),
];

const createMidItems = ({
  summary,
  categories,
  type,
}: Grant): DetailItemProps[] => [
  ...conditionalItem(!!summary, {
    label: 'Summary:',
    value: <MarkdownContent content={summary} />,
  }),
  ...conditionalItem(categories.length > 0, {
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
  }),
  ...conditionalItem(!!type, {
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
  }),
];

const createLowerItems = ({ reputations }: Grant): DetailItemProps[] => [
  ...conditionalItem(reputations.length > 0, {
    label: 'Reputations',
    value: <DetailValueTags items={reputations} />,
  }),
];

export const getGrantCardData = (grant: Grant) => {
  const { url, discord, twitter } = grant;

  const topItems = createTopItems(grant);
  const hasTopItems = topItems.length > 0;

  const midItems = createMidItems(grant);
  const hasMidItems = midItems.length > 0;

  const lowerItems = createLowerItems(grant);
  const hasLowerItems = lowerItems.length > 0;

  const hasWebLinks = !!url || !!discord || !!twitter;

  return {
    ...grant,
    topItems,
    hasTopItems,
    midItems,
    hasMidItems,
    lowerItems,
    hasLowerItems,
    hasWebLinks,
  };
};
