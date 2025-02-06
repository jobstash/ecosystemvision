'use client';

import { GrantFunding } from '@/shared/core/schemas';
import { FundingRound } from '@/shared/core/schemas';
import { Heading } from '@/shared/components/heading';

import { FundingSplitProvider } from './context';
import { FundingSubTotal } from './funding-sub-total';
import { GrantsSubTotal } from './grants-sub-total';
import { GroupSelections } from './group-selections';
import { SplitLine } from './split-line';

interface Props {
  grants: GrantFunding[];
  fundingRounds: FundingRound[];
}

export const FundingSplit = (props: Props) => {
  const { grants, fundingRounds } = props;

  if (!grants.length && !fundingRounds.length) return null;

  return (
    <FundingSplitProvider grants={grants} fundingRounds={fundingRounds}>
      <div className="flex flex-col gap-2 py-4">
        <div className="flex justify-between">
          <Heading className="text-lg" text="Grants" />
          <Heading className="text-lg" text="Funding" />
        </div>
        <div className="flex justify-between">
          <GroupSelections type="grant" />
          <GroupSelections type="funding" />
        </div>
        <SplitLine />
        <div className="flex justify-between">
          <GrantsSubTotal />
          <FundingSubTotal />
        </div>
      </div>
    </FundingSplitProvider>
  );
};
