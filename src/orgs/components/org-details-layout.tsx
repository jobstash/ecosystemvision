import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { HREFS } from '@/shared/core/constants';
import { getQueryClient } from '@/shared/utils/get-query-client';
import { DetailsPanelLayout } from '@/shared/components/details-panel/layout';

import { orgQueryKeys } from '@/orgs/core/query-keys';
import { getOrgDetails } from '@/orgs/data/get-org-details';

import { InitOrgDetailsSyncer } from './init-org-details-syncer';
import { OrgDetailsPanelHeader } from './org-details-panel-header';
import { OrgTabs } from './org-tabs';

interface Props {
  children: React.ReactNode;
  slug: string;
}

export const OrgDetailsLayout = async ({ children, slug }: Props) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: orgQueryKeys.details(slug),
    queryFn: () => getOrgDetails(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailsPanelLayout backHref={HREFS.ORGS_PAGE}>
        <InitOrgDetailsSyncer slug={slug} />
        <OrgDetailsPanelHeader slug={slug} />
        <OrgTabs slug={slug} />
        {children}
      </DetailsPanelLayout>
    </HydrationBoundary>
  );
};
