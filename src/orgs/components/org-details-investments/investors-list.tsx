import { OrgDetails } from '@/orgs/core/schemas';

import { InvestorItem } from './investor-item';

interface Props {
  investors: OrgDetails['investors'];
}

export const InvestorsList = ({ investors }: Props) => (
  <div className="flex flex-wrap items-center gap-4">
    {investors.map(({ id, name }) => (
      <InvestorItem key={id} id={id} name={name} />
    ))}
  </div>
);
