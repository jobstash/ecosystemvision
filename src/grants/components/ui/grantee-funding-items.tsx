import { formatNumber } from '@/shared/utils/format-number';
import { shortTimestamp } from '@/shared/utils/short-timestamp';
import { BankIcon } from '@/shared/components/icons/bank-icon';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';

import { Grantee } from '@/grants/core/schemas';

import { DetailItemProps, DetailItems } from './base/detail-item';
import { DetailValueText } from './base/detail-value-text';

const createFundingItems = ({
  lastFunding,
  fundingDate,
}: Grantee): DetailItemProps[] => [
  {
    icon: <PaperbillIcon />,
    label: 'Last Funding',
    value: (
      <DetailValueText className="text-sm">{`$${formatNumber(lastFunding)}`}</DetailValueText>
    ),
  },
  {
    icon: <BankIcon />,
    label: 'Funding Date',
    value: (
      <DetailValueText className="text-sm">
        {shortTimestamp(fundingDate)}
      </DetailValueText>
    ),
  },
];

interface Props {
  grantee: Grantee;
}

export const GranteeFundingItems = ({ grantee }: Props) => {
  const fundingItems = createFundingItems(grantee);

  return <DetailItems items={fundingItems} classNames={{ label: 'text-sm' }} />;
};
