import { FundingRoundsList } from '@/shared/components/funding-rounds-list';
import { Heading } from '@/shared/components/heading';

import { OrgDetails } from '@/orgs/core/schemas';

const HEADING_TEXT = 'Funding Rounds';

interface Props {
  fundingRounds: OrgDetails['fundingRounds'];
}

export const FundingRounds = ({ fundingRounds }: Props) => {
  if (!fundingRounds.length) return null;

  return (
    <div className="flex flex-col gap-y-4">
      <Heading text={HEADING_TEXT} className="text-xl" />
      <FundingRoundsList fundingRounds={fundingRounds} />
    </div>
  );
};
