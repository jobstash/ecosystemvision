import { FundingRound } from '@/shared/core/schemas';
import { Divider } from '@/shared/components/divider';
import { FundingRoundsList } from '@/shared/components/funding-rounds-list';
import { Heading } from '@/shared/components/heading';

const HEADING_TEXT = 'Funding Rounds';

interface Props {
  fundingRounds: FundingRound[];
}

export const FundingRounds = ({ fundingRounds }: Props) => {
  const count = fundingRounds.length;

  if (!count) return null;

  return (
    <>
      <Divider />
      <Heading text={HEADING_TEXT} className="text-lg font-semibold" />
      <FundingRoundsList fundingRounds={fundingRounds} />
    </>
  );
};
