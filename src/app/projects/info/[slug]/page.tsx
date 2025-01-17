import { getProjectDetails } from '@/projects/data/get-project-details';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await getProjectDetails(slug);

  return (
    <div>
      <pre>{JSON.stringify(data, undefined, '\t')}</pre>
    </div>
  );
};

export default Page;
