import { getGrantDetails } from '@/grants/data/get-grant-details';
import { FullGrantCard } from '@/grants/components/grant-card/full-grant-card';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async (props: Props) => {
  const params = await props.params;

  const data = await getGrantDetails(params.slug);

  return (
    <div className="min-h-screen">
      <div className="pt-16">
        <FullGrantCard grant={data} isRounded={false} />
      </div>
    </div>
  );
};

export default Page;
