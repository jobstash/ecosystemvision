import { GranteeDefaultPage } from '@/grants/pages/grantee-default-page';

interface Props {
  params: { grantId: string };
}

const Page = ({ params: { grantId } }: Props) => (
  <GranteeDefaultPage grantId={grantId} />
);
export default Page;
