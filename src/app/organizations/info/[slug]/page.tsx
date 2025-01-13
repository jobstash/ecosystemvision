import { getOrgDetails } from '@/orgs/data/get-org-details';

interface Props {
  params: {
    slug: string;
  };
}

const Page = async ({ params: { slug } }: Props) => {
  const data = await getOrgDetails(slug);

  return (
    <div>
      <pre>{JSON.stringify(data, undefined, '\t')}</pre>
    </div>
  );
};

export default Page;
