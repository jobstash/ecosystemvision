import { HandCoinsIcon } from 'lucide-react';

import { InfoTagProps } from '@/shared/core/types';
import { cn } from '@/shared/utils/cn';
import { formatNumber } from '@/shared/utils/format-number';
import { shortTimestamp } from '@/shared/utils/short-timestamp';
import { BankIcon } from '@/shared/components/icons/bank-icon';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';
import { InfoTag } from '@/shared/components/info-tag';

import { OrgDetails } from '@/orgs/core/schemas';

type FundingRound = OrgDetails['fundingRounds'][number];

interface Props extends FundingRound {
  showDivider: boolean;
  isGrid: boolean;
}

export const FundingRoundItem = (props: Props) => {
  const { date, raisedAmount, roundName, showDivider, isGrid } = props;

  const infoTags = [
    roundName && {
      text: `Funding Round: ${roundName}`,
      icon: <BankIcon />,
    },
    {
      text: `Funding Date: ${shortTimestamp(date)}`,
      icon: <HandCoinsIcon size={16} />,
    },
    raisedAmount && {
      text: `Raised Amount: $${formatNumber(raisedAmount * 1_000_000)}`,
      icon: <PaperbillIcon />,
    },
  ].filter(Boolean) as InfoTagProps[];

  return (
    <div className="flex flex-col gap-2.5">
      <div
        className={cn({
          'flex flex-wrap items-center gap-x-4': !isGrid,
          'grid max-w-3xl grid-cols-3': isGrid,
        })}
      >
        {infoTags.map((tag) => (
          <InfoTag key={tag.text} tag={tag} />
        ))}
      </div>

      {showDivider && (
        <div className="flex h-fit flex-col justify-center">
          <hr className="border-t border-dashed border-white/20" />
        </div>
      )}
    </div>
  );
};
