import { GrantFunding } from '@/shared/core/schemas';

import { GrantsListItem } from './item';

interface Props {
  grants: GrantFunding[];
}

export const GrantsList = ({ grants }: Props) => {
  const count = grants.length;
  const isGrid = count > 1;

  return (
    <div className="flex flex-col gap-y-2">
      {grants.map((grant, i) => {
        const { amount, programName, fundingDate, tokenUnit, tokenAmount } =
          grant;
        const showDivider = i !== count - 1;
        return (
          <GrantsListItem
            key={grant.id}
            amount={amount}
            programName={programName}
            fundingDate={fundingDate}
            tokenUnit={tokenUnit}
            tokenAmount={tokenAmount}
            showDivider={showDivider}
            isGrid={isGrid}
          />
        );
      })}
    </div>
  );
};
