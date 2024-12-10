import { PillarParams, PillarSearchParams } from '@/search/core/types';

import { PillarPage } from '@/search/pages/pillar-page';

interface Props {
  params: PillarParams;
  searchParams: PillarSearchParams;
}

const Page = ({ params, searchParams }: Props) => {
  return (
    <PillarPage nav="projects" params={params} searchParams={searchParams} />
  );
};

export default Page;
