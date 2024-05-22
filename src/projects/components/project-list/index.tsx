'use client';

import { cn } from '@/shared/utils/cn';
import { reloadPage } from '@/shared/utils/reload-page';
import { InternalErrorResult } from '@/shared/components/internal-error-result';
import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

import { InitProjectCard } from '@/projects/components/init-project-card';
import { ProjectCard } from '@/projects/components/project-card';
import { useFiltersContext } from '@/filters/providers/filters-provider/context';

import { useProjectList } from './use-project-list';

export const ProjectList = () => {
  const {
    projects,
    error,
    inViewRef,
    hasNextPage,
    isSuccess,
    isPending: isPendingList,
  } = useProjectList();
  const hasProjects = projects.length > 0;

  const { isPendingFilters, filterParamsString } = useFiltersContext();

  const isPending = [isPendingFilters, isPendingList].includes(true);

  return (
    <>
      {error && <InternalErrorResult onReset={reloadPage} />}

      {isPending ? (
        <p>Card Skeleton</p>
      ) : isSuccess && hasProjects ? (
        <>
          <InitProjectCard filterParamsString={filterParamsString} />
          <VirtualWrapper count={projects.length}>
            {(index) => (
              <div className={cn({ 'pt-8': index > 0 })}>
                <ProjectCard
                  project={projects[index]}
                  filterParamsString={filterParamsString}
                />
              </div>
            )}
          </VirtualWrapper>

          {hasNextPage ? (
            <div ref={inViewRef}>
              <p>Card Skeleton</p>
            </div>
          ) : (
            <p>TODO: No more projects UI</p>
          )}
        </>
      ) : (
        <p>Empty UI</p>
      )}
    </>
  );
};
