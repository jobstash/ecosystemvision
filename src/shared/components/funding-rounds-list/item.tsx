import { HandCoinsIcon } from 'lucide-react';

import { InfoTagProps } from '@/shared/core/types';
import { cn } from '@/shared/utils/cn';
import { formatNumber } from '@/shared/utils/format-number';
import { shortTimestamp } from '@/shared/utils/short-timestamp';
import { BankIcon } from '@/shared/components/icons/bank-icon';
import { PaperbillIcon } from '@/shared/components/icons/paperbill-icon';
import { InfoTag } from '@/shared/components/info-tag';

interface Props {
  showDivider: boolean;
  round: string | null;
  date: number;
  amount: number | null;
  isGrid?: boolean;
}

export const FundingRoundItem = (props: Props) => {
  const { showDivider, round, date, amount, isGrid } = props;

  const infoTags = [
    round && {
      text: `Funding Round: ${round}`,
      icon: <BankIcon />,
    },
    {
      text: `Funding Date: ${shortTimestamp(date)}`,
      icon: <HandCoinsIcon size={16} />,
    },
    amount && {
      text: `Raised Amount: $${formatNumber(amount * 1_000_000)}`,
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
