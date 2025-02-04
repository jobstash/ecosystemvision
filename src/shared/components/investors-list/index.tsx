import { Investor } from '@/shared/core/schemas';

import { InvestorItem } from './item';
interface Props {
  investors: Investor[];
}

export const InvestorsList = ({ investors }: Props) => (
  <div className="flex flex-wrap items-center gap-4">
    {investors.map(({ id, name }) => (
      <InvestorItem key={id} id={id} name={name} />
    ))}
  </div>
);
