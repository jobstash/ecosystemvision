import { Grantee } from '../core/types';

import { GranteeItem } from './grantee-item/grantee-item';

interface Props {
  grantees: Grantee[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GranteeList = ({ grantees }: Props) => {
  // TODO: JOB-681
  return (
    <div className="flex flex-col gap-4">
      {grantees.map((grantee) => (
        <GranteeItem key={grantee.id} grantee={grantee} />
      ))}
    </div>
  );
};
export default GranteeList;
