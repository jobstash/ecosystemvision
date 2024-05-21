import { ProjectDetailsLayout } from '@/projects/components/project-details-layout';

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

const Layout = ({ children, params: { id } }: Props) => {
  return <ProjectDetailsLayout id={id}>{children}</ProjectDetailsLayout>;
};

export default Layout;
