import { PillarParams, PillarSearchParams } from '@/search/core/types';
import { OrgListClient } from '@/orgs/components/org-list/org-list-client';

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
      nav="organizations"
      params={params}
      searchParams={searchParams}
      content={
        <OrgListClient
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
