import { GranteeProjectDefaultPage } from '@/grants/pages/grantee-project-default-page';

interface Props {
  params: { granteeId: string };
}

const Page = ({ params: { granteeId } }: Props) => (
  <GranteeProjectDefaultPage granteeId={granteeId} />
);
export default Page;
