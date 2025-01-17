import { ProjectDetailsLayout } from '@/projects/components/project-details-layout';

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

const Layout = async ({ children, params }: Props) => {
  const { slug } = await params;
  return <ProjectDetailsLayout slug={slug}>{children}</ProjectDetailsLayout>;
};

export default Layout;
