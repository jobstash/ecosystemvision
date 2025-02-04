import { OrgDetails } from '@/orgs/core/schemas';

import { FundingRoundItem } from './funding-round-item';

interface Props {
  fundingRounds: OrgDetails['fundingRounds'];
}

export const FundingRoundsList = ({ fundingRounds }: Props) => {
  const count = fundingRounds.length;
  const isGrid = count > 1;

  return (
    <div className="flex flex-col gap-x-4 gap-y-2">
      {fundingRounds.map((round, index) => (
        <FundingRoundItem
          key={round.id}
          {...round}
          showDivider={index !== count - 1}
          isGrid={isGrid}
        />
      ))}
    </div>
  );
};
