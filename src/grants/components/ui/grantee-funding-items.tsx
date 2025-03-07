import { CoinsIcon } from 'lucide-react';

import { conditionalItem } from '@/shared/utils/conditional-item';
import { formatNumber } from '@/shared/utils/format-number';
import { shortTimestamp } from '@/shared/utils/short-timestamp';
import { BankIcon } from '@/shared/components/icons/bank-icon';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';

import { GranteeItem } from '@/grants/core/schemas';

import { DetailItemProps, DetailItems } from './base/detail-item';
import { DetailValueText } from './base/detail-value-text';

const createFundingItems = ({
  lastFundingAmount,
  lastFundingTokenAmount,
  lastFundingTokenUnit,
  lastFundingDate,
}: GranteeItem): DetailItemProps[] => [
  ...conditionalItem(!!lastFundingAmount, {
    icon: <PaperbillIcon />,
    label: 'Last Funding:',
    value: (
      <DetailValueText>{`$${formatNumber(lastFundingAmount!)}`}</DetailValueText>
    ),
  }),
  ...conditionalItem(!!lastFundingTokenAmount && !!lastFundingTokenUnit, {
    icon: <CoinsIcon size={18} />,
    label: 'Token Amount:',
    value: (
      <DetailValueText>{`${formatNumber(lastFundingTokenAmount!)} ${lastFundingTokenUnit}`}</DetailValueText>
    ),
  }),
  ...conditionalItem(!!lastFundingDate, {
    icon: <BankIcon />,
    label: 'Funding Date:',
    value: (
      <DetailValueText>
        {shortTimestamp(lastFundingDate! / 1000)}
      </DetailValueText>
    ),
  }),
];

interface Props {
  granteeItem: GranteeItem;
}

export const GranteeFundingItems = ({ granteeItem }: Props) => {
  const fundingItems = createFundingItems(granteeItem);

  return (
    <DetailItems
      items={fundingItems}
      classNames={{
        container: 'gap-x-4 gap-y-1.5',
        root: 'text-13',
        label: 'text-current',
      }}
    />
  );
};
