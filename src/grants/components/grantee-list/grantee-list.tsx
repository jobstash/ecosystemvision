import { Grantee } from '@/grants/core/schemas';

import { GranteeListItem } from './item';

interface Props {
  grantees: Grantee[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GranteeList = ({ grantees }: Props) => {
  // TODO: JOB-681
  return (
    <div className="flex flex-col gap-4">
      {grantees.map((grantee) => (
        <GranteeListItem key={grantee.id} grantee={grantee} />
      ))}
    </div>
  );
};
