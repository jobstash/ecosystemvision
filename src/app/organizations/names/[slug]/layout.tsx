import { OrgDetailsLayout } from '@/orgs/components/org-details-layout';

interface Props {
  params: { slug: string };
  children: React.ReactNode;
}

const Layout = ({ children, params: { slug } }: Props) => {
  return <OrgDetailsLayout slug={slug}>{children}</OrgDetailsLayout>;
};

export default Layout;
