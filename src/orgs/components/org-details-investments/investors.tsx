import { Heading } from '@/shared/components/heading';
import { InvestorsList } from '@/shared/components/investors-list';

import { OrgDetails } from '@/orgs/core/schemas';

const HEADING_TEXT = 'Investors';

interface Props {
  investors: OrgDetails['investors'];
}

export const Investors = ({ investors }: Props) => {
  if (!investors.length) return null;

  return (
    <div className="flex flex-col gap-y-4 pt-2">
      <Heading text={HEADING_TEXT} className="text-xl" />
      <InvestorsList investors={investors} />
    </div>
  );
};
