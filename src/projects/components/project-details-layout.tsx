import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { HREFS } from '@/shared/core/constants';
import { getQueryClient } from '@/shared/utils/get-query-client';
import { DetailsPanelLayout } from '@/shared/components/details-panel/layout';

import { projectQueryKeys } from '@/projects/core/query-keys';
import { getProjectDetails } from '@/projects/data/get-project-details';

import { InitProjectDetailsSyncer } from './init-project-details-syncer';
import { ProjectDetailsPanelHeader } from './project-details-panel-header';
import { ProjectTabs } from './project-tabs';

interface Props {
  slug: string;
  children: React.ReactNode;
}

export const ProjectDetailsLayout = async ({ slug, children }: Props) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: projectQueryKeys.details(slug),
    queryFn: () => getProjectDetails(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailsPanelLayout backHref={HREFS.PROJECTS_PAGE}>
        <InitProjectDetailsSyncer slug={slug} />
        <ProjectDetailsPanelHeader slug={slug} />
        <ProjectTabs slug={slug} />
        {children}
      </DetailsPanelLayout>
    </HydrationBoundary>
  );
};
