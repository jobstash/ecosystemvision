import { PillarParams, PillarSearchParams } from '@/search/core/types';
import { OrgListClient } from '@/orgs/components/org-list/org-list-client';

import { PillarPage } from '@/search/pages/pillar-page';

interface Props {
  params: PillarParams;
  searchParams: PillarSearchParams;
}

const Page = ({ params, searchParams }: Props) => {
  return (
    <PillarPage
      nav="organizations"
      params={params}
      searchParams={searchParams}
      content={
        <OrgListClient
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
