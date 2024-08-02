import GranteeList from '@/grants/components/grantee-list';

import { fakeGrant } from '@/grants/testutils/fake-grant';

interface Props {
  params: { grantId: string };
}

const ParallelGranteeList = ({}: Props) => {
  // TODO: fetch grant using grantId
  const grant = fakeGrant;

  return <GranteeList grantees={grant.grantees} />;
};

export default ParallelGranteeList;
