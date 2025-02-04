import { OrgDetails } from '@/orgs/core/schemas';

import { FundingRounds } from './funding-rounds';
import { Investors } from './investors';

interface Props {
  org: OrgDetails;
}

export const OrgDetailsInvestments = ({ org }: Props) => {
  const { fundingRounds, investors } = org;

  return (
    <div className="flex flex-col gap-y-4">
      <FundingRounds fundingRounds={fundingRounds} />
      <Investors investors={investors} />
    </div>
  );
};
