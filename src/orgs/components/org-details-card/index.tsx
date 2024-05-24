import { FundingRound, Investor } from '@/shared/core/schemas';
import { DetailsPanelActionsWrapper } from '@/shared/components/details-panel/actions-wrapper';
import { DetailsPanelCardWrapper } from '@/shared/components/details-panel/card-wrapper';
import { DetailsPanelCTA } from '@/shared/components/details-panel/cta';
import { Divider } from '@/shared/components/divider';
import { Heading } from '@/shared/components/heading';
import { Text } from '@/shared/components/text';

import { FundingRounds } from './funding-rounds';
import { Investors } from './investors';

const CTA_TEXT = 'Explore Organization';

interface Props {
  org: {
    name: string;
    description: string;
    fundingRounds: FundingRound[];
    investors: Investor[];
  };
  actionHref?: string;
}

export const OrgDetailsCard = ({
  org: { name, description, fundingRounds, investors },
  actionHref,
}: Props) => {
  return (
    <DetailsPanelCardWrapper>
      <Heading text={name} />
      <Divider />
      <Text text={description} />
      <FundingRounds fundingRounds={fundingRounds} />
      <Investors investors={investors} />
      {actionHref && (
        <>
          <Divider />
          <DetailsPanelActionsWrapper>
            <DetailsPanelCTA text={CTA_TEXT} href={actionHref} />
          </DetailsPanelActionsWrapper>
        </>
      )}
    </DetailsPanelCardWrapper>
  );
};
