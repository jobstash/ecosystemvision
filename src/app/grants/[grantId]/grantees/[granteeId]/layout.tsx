import { GranteePageLayout } from '@/grants/pages/grantee-page-layout';

interface Props {
  children: React.ReactNode;
  params: { grantId: string; granteeId: string };
}

const GranteePage = ({ children, params: { grantId, granteeId } }: Props) => {
  return (
    <GranteePageLayout grantId={grantId} granteeId={granteeId}>
      {children}
    </GranteePageLayout>
  );
};

export default GranteePage;
