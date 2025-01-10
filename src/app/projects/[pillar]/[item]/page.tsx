import { PillarParams, PillarSearchParams } from '@/search/core/types';
import { createPillarItemSearchParams } from '@/search/utils/create-pillar-item-search-params';
import { ProjectListClient } from '@/projects/components/project-list/project-list-client';

import { PillarPage } from '@/search/pages/pillar-page';

interface Props {
  params: PillarParams;
  searchParams: PillarSearchParams;
}

const Page = ({ params, searchParams }: Props) => {
  const finalSearchParams = createPillarItemSearchParams(params, searchParams);

  return (
    <PillarPage
      nav="projects"
      params={params}
      searchParams={searchParams}
      content={<ProjectListClient searchParams={finalSearchParams} />}
    />
  );
};

export default Page;
