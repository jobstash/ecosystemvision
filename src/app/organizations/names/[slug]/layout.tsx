import { OrgDetailsLayout } from '@/orgs/components/org-details-layout';

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

const Layout = async ({ children, params }: Props) => {
  const { slug } = await params;
  return <OrgDetailsLayout slug={slug}>{children}</OrgDetailsLayout>;
};

export default Layout;
