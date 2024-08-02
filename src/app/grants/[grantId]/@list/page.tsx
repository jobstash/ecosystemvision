import GranteeList from '@/grants/components/grantee-list';

import { fakeGrantee } from '@/grants/testutils/fake-grantee';

interface Props {
  params: { grantId: string };
}

const ParallelGranteeList = ({}: Props) => {
  // TODO: fetch grantees using grantId
  const grantees = Array.from({ length: 12 }).map(() => fakeGrantee);

  return <GranteeList grantees={grantees} />;
};

export default ParallelGranteeList;
