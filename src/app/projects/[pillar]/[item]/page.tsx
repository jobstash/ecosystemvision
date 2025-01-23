import { ProjectListClient } from '@/projects/components/project-list/project-list-client';

import { PillarPage } from '@/search/pages/pillar-page';

interface Props {
  params: Promise<{ pillar: string; item: string }>;
  searchParams: Promise<Record<string, string>>;
}

const Page = async (props: Props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;

  return (
    <PillarPage
      nav="projects"
      params={params}
      searchParams={searchParams}
      content={<ProjectListClient searchParams={searchParams} />}
    />
  );
};

export default Page;
