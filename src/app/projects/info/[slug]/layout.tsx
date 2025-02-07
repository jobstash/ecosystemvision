import { DetailsLayout } from '@/shared/components/details-layout';

import { createProjectDetailsTabs } from '@/projects/utils/create-project-details-tabs';
import { getProjectDetails } from '@/projects/data/get-project-details';
import { ProjectDetailsHeader } from '@/projects/components/project-details-header';

interface Props {
  params: Promise<{
    slug: string;
  }>;
  children: React.ReactNode;
}

const Layout = async ({ params, children }: Props) => {
  const { slug } = await params;
  const data = await getProjectDetails(slug);
  const tabs = createProjectDetailsTabs(data);

  return (
    <DetailsLayout
      nav="projects"
      header={<ProjectDetailsHeader project={data} />}
      tabs={tabs}
    >
      {children}
    </DetailsLayout>
  );
};

export default Layout;
