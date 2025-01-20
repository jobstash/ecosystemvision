import { PillarParams, PillarSearchParams } from '@/search/core/types';
import { createPillarItemSearchParams } from '@/search/utils/create-pillar-item-search-params';
import { ProjectListClient } from '@/projects/components/project-list/project-list-client';

import { PillarPage } from '@/search/pages/pillar-page';

interface Props {
  params: Promise<PillarParams>;
  searchParams: Promise<PillarSearchParams>;
}

const Page = async (props: Props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
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
