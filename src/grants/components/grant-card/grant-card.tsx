import { Grant } from '@/grants/core/schemas';
import { ClientWrapper } from '@/grants/components/grant-card/client-wrapper';
import { CollapsedGrantCard } from '@/grants/components/grant-card/collapsed-grant-card';
import { FullGrantCard } from '@/grants/components/grant-card/full-grant-card';

interface Props {
  grant: Grant;
}

export const GrantCard = ({ grant }: Props) => {
  // TODO: JOB-678

  return (
    <ClientWrapper
      collapsed={<CollapsedGrantCard grant={grant} />}
      full={<FullGrantCard grant={grant} />}
    />
  );
};
