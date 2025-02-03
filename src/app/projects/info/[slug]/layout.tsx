import { DetailsTabs } from '@/shared/components/details-tabs';
import { Divider } from '@/shared/components/divider';

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
    <>
      <div className="flex max-w-4xl flex-col gap-4 p-8">
        <ProjectDetailsHeader project={data} />
        <Divider />
        <DetailsTabs tabs={tabs} />
        <div className="px-1">{children}</div>
      </div>
    </>
  );
};
export default Layout;
