import { PillarParams, PillarSearchParams } from '@/search/core/types';
import { createPillarItemSearchParams } from '@/search/utils/create-pillar-item-search-params';
import { OrgListClient } from '@/orgs/components/org-list/org-list-client';

import { PillarPage } from '@/search/pages/pillar-page';

interface Props {
  params: PillarParams;
  searchParams: PillarSearchParams;
}

const Page = ({ params, searchParams }: Props) => {
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
