import { PillarParams, PillarSearchParams } from '@/search/core/types';
import { ProjectListClient } from '@/projects/components/project-list/project-list-client';

import { PillarPage } from '@/search/pages/pillar-page';

interface Props {
  params: PillarParams;
  searchParams: PillarSearchParams;
}

const Page = ({ params, searchParams }: Props) => {
  return (
    <PillarPage
      nav="projects"
      params={params}
      searchParams={searchParams}
      content={
        <ProjectListClient
          searchParams={{
            nav: 'organizations',
            pillar: params.pillar,
            item: params.item,
            ...searchParams,
          }}
        />
      }
    />
  );
};

export default Page;
