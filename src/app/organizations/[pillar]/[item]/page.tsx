import { Metadata } from 'next';

import { FRONTEND_URL } from '@/shared/core/envs';

import { addMainItemToSearchParams } from '@/search/utils/add-main-item-to-search-params';
import { getPillarInfo } from '@/search/data/get-pillar-info';
import { OrgListClient } from '@/orgs/components/org-list/org-list-client';

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
      nav="organizations"
      params={params}
      searchParams={searchParams}
      content={<OrgListClient searchParams={updatedSearchParams} />}
    />
  );
};

export default Page;

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const pillarInfo = await getPillarInfo({
    nav: 'organizations',
    pillar: params.pillar,
    item: params.item,
    searchParams,
  });

  return {
    title: pillarInfo.title,
    description: pillarInfo.description,
    alternates: {
      canonical: `${FRONTEND_URL}/organizations/${params.pillar}/${params.item}`,
    },
  };
};
