import Link from 'next/link';

import { Avatar, Button } from '@nextui-org/react';

import { formatNumber } from '@/shared/utils/format-number';
import { getWebsiteText } from '@/shared/utils/get-website-text';
import { shortTimestamp } from '@/shared/utils/short-timestamp';
import { Divider } from '@/shared/components/divider';
import { BankIcon } from '@/shared/components/icons/bank-icon';
import { ExternalIcon } from '@/shared/components/icons/external-icon';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';

import { Grantee } from '../../core/types';
import { DetailItemProps, DetailItems } from '../ui/base/detail-item';

interface Props {
  grantee: Grantee;
}

const createFundingItems = ({
  lastFunding,
  fundingDate,
}: Grantee): DetailItemProps[] => [
  {
    icon: <PaperbillIcon />,
    label: 'Last Funding',
    value: `$${formatNumber(lastFunding)}`,
  },
  {
    icon: <BankIcon />,
    label: 'Funding Date',
    value: shortTimestamp(fundingDate),
  },
];

export const GranteeCard = ({ grantee }: Props) => {
  // TODO: JOB-685

  const { logo, name, url, category, summary } = grantee;

  const fundingItems = createFundingItems(grantee);

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gradient-to-l from-[#0D0D0D] to-primary p-6 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="size-10">
          <Avatar showFallback radius="sm" src={logo ?? ''} name={name} />
        </div>

        <div className="flex flex-col">
          <span>{name}</span>
          <span>{category}</span>
        </div>
      </div>

      <span>{summary}</span>

      {url && (
        <Button
          size="sm"
          as={Link}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-2 bg-white/10 text-sm"
        >
          <span>{getWebsiteText(url).hostname}</span>
          <ExternalIcon />
        </Button>
      )}

      <Divider />

      <div className="flex flex-col gap-2">
        <span>Funding Details</span>

        <DetailItems items={fundingItems} />
      </div>
    </div>
  );
};
