import { getProjectDetails } from '@/projects/data/get-project-details';

interface Props {
  params: {
    slug: string;
  };
}

const Page = async ({ params: { slug } }: Props) => {
  const data = await getProjectDetails(slug);

  return (
    <div>
      <pre>{JSON.stringify(data, undefined, '\t')}</pre>
    </div>
  );
};

export default Page;
