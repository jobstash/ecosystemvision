import { getGrantDetails } from '@/grants/data/get-grant-details';

import { GrantDetailsPage } from '@/grants/pages/grant-details-page';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async (props: Props) => {
  const params = await props.params;
  const data = await getGrantDetails(params.slug);
  return <GrantDetailsPage grant={data} />;
};

export default Page;
