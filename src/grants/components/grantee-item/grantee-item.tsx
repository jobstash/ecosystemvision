import { Avatar } from '@nextui-org/react';

import { formatNumber } from '@/shared/utils/format-number';
import { shortTimestamp } from '@/shared/utils/short-timestamp';

import { Grantee } from '@/grants/core/types';

import { DetailItemProps, DetailItems } from '../ui/base/detail-item';
import { CaretRightIcon } from '../ui/icons/caret-right-icon';

import { ClientWrapper } from './client-wrapper';

interface Props {
  grantee: Grantee;
}

const createFundingItems = ({
  lastFunding,
  fundingDate,
}: Grantee): DetailItemProps[] => [
  { icon: null, label: 'Last Funding', value: `$${formatNumber(lastFunding)}` },
  { icon: null, label: 'Funding Date', value: shortTimestamp(fundingDate) },
];

export const GranteeItem = ({ grantee }: Props) => {
  // TODO: JOB-680

  const { id, name, logo, category } = grantee;

  const fundingItems = createFundingItems(grantee);

  return (
    <ClientWrapper
      granteeId={id}
      className="flex items-center justify-between gap-4 rounded-lg p-4"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="size-10">
            <Avatar showFallback radius="sm" src={logo ?? ''} name={name} />
          </div>
          <div className="flex flex-col">
            <span>{name}</span>
            <span>{category}</span>
          </div>
        </div>
        <DetailItems items={fundingItems} />
      </div>
      <CaretRightIcon />
    </ClientWrapper>
  );
};
