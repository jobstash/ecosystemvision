import { PillarParams, PillarSearchParams } from '@/search/core/types';
import { ProjectListClient } from '@/projects/components/project-list/project-list-client';

import { PillarPage } from '@/search/pages/pillar-page';

interface Props {
  params: PillarParams;
  searchParams: PillarSearchParams;
}

const Page = ({ params, searchParams }: Props) => {
  const { include, ...restSearchParams } = searchParams;
  const pillarValue = include ? `${params.item},${include}` : params.item;
  return (
    <PillarPage
      nav="projects"
      params={params}
      searchParams={searchParams}
      content={
        <ProjectListClient
          searchParams={{
            [params.pillar]: pillarValue,
            ...restSearchParams,
          }}
        />
      }
    />
  );
};

export default Page;
