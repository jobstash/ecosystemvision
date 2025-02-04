import { getProjectDetails } from '@/projects/data/get-project-details';
import { ProjectDetailsOverview } from '@/projects/components/project-details-overview';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await getProjectDetails(slug);

  return <ProjectDetailsOverview project={data} />;
};

export default Page;
