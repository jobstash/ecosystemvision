import { addMainItemToSearchParams } from '@/search/utils/add-main-item-to-search-params';
import { ProjectListClient } from '@/projects/components/project-list/project-list-client';

import { PillarPage } from '@/search/pages/pillar-page';

interface Props {
  params: Promise<{ pillar: string; item: string }>;
  searchParams: Promise<Record<string, string>>;
}

const Page = async (props: Props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const updatedSearchParams = addMainItemToSearchParams({
    pillar: params.pillar,
    item: params.item,
    searchParams,
  });

  return (
    <PillarPage
      nav="projects"
      params={params}
      searchParams={searchParams}
      content={<ProjectListClient searchParams={updatedSearchParams} />}
    />
  );
};

export default Page;
