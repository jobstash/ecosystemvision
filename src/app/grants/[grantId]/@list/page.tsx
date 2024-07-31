import GranteeList from '@/grants/components/grantee-list';

interface Props {
  params: { grantId: string };
}

const ParallelGranteeList = ({ params: { grantId } }: Props) => {
  return <GranteeList grantId={grantId} />;
};

export default ParallelGranteeList;
