import { ProjectDetailsLayout } from '@/projects/components/project-details-layout';

interface Props {
  params: { slug: string };
  children: React.ReactNode;
}

const Layout = ({ children, params: { slug } }: Props) => {
  return <ProjectDetailsLayout slug={slug}>{children}</ProjectDetailsLayout>;
};

export default Layout;
