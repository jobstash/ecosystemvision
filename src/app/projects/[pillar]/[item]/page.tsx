import { PillarParams } from '@/search/core/types';

import { PillarPage } from '@/search/pages/pillar-page';

interface Props {
  params: PillarParams;
}

const Page = ({ params }: Props) => {
  return <PillarPage nav="projects" params={params} />;
};

export default Page;
