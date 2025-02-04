import { FundingRound } from '@/shared/core/schemas';

import { FundingRoundItem } from './item';

interface Props {
  fundingRounds: FundingRound[];
}

export const FundingRoundsList = ({ fundingRounds }: Props) => {
  const count = fundingRounds.length;
  const isGrid = count > 1;

  return (
    <div className="flex flex-col gap-x-4 gap-y-2">
      {fundingRounds.map(({ id, roundName, date, raisedAmount }, index) => (
        <FundingRoundItem
          key={id}
          round={roundName}
          date={date}
          amount={raisedAmount}
          showDivider={index !== count - 1}
          isGrid={isGrid}
        />
      ))}
    </div>
  );
};
