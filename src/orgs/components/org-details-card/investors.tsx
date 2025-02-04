import { Investor } from '@/shared/core/schemas';
import { Divider } from '@/shared/components/divider';
import { Heading } from '@/shared/components/heading';
import { InvestorsList } from '@/shared/components/investors-list';

const HEADING_TEXT = 'Investors';

interface Props {
  investors: Investor[];
}

export const Investors = ({ investors }: Props) => {
  const count = investors.length;

  if (!count) return null;

  return (
    <>
      <Divider />
      <Heading text={HEADING_TEXT} className="text-lg font-semibold" />
      <InvestorsList investors={investors} />
    </>
  );
};
