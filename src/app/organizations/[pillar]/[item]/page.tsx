import { PillarParams, PillarSearchParams } from '@/search/core/types';
import { createPillarItemSearchParams } from '@/search/utils/create-pillar-item-search-params';
import { OrgListClient } from '@/orgs/components/org-list/org-list-client';

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
      nav="organizations"
      params={params}
      searchParams={searchParams}
      content={<OrgListClient searchParams={finalSearchParams} />}
    />
  );
};

export default Page;
