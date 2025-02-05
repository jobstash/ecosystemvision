import { GrantFunding } from '@/shared/core/schemas';
import { Divider } from '@/shared/components/divider';
import { GrantsList } from '@/shared/components/grants-list';
import { Heading } from '@/shared/components/heading';

const HEADING_TEXT = 'Grants';

interface Props {
  grants: GrantFunding[];
}

export const Grants = ({ grants }: Props) => {
  const count = grants.length;

  if (!count) return null;

  return (
    <>
      <Divider />
      <Heading text={HEADING_TEXT} className="text-lg font-semibold" />
      <GrantsList grants={grants} />
    </>
  );
};
