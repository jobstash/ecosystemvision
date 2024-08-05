import { GranteeList } from '@/grants/components/grantee-list';

interface Props {
  params: { grantId: string };
}

const ParallelGranteeList = ({}: Props) => {
  // TODO: React-Query SSR grantee list

  return <GranteeList />;
};

export default ParallelGranteeList;
