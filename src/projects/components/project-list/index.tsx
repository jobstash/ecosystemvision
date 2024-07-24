'use client';

import { cn } from '@/shared/utils/cn';
import { reloadPage } from '@/shared/utils/reload-page';
import { CardSkeleton } from '@/shared/components/card-skeleton';
import { InternalErrorResult } from '@/shared/components/internal-error-result';
import { Loader } from '@/shared/components/loader';
import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

import { InitProjectCard } from '@/projects/components/init-project-card';
import { ProjectCard } from '@/projects/components/project-card';

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

  return (
    <>
      {error && <InternalErrorResult onReset={reloadPage} />}

      {isPendingList ? (
        <CardSkeleton />
      ) : isSuccess && hasProjects ? (
        <>
          <InitProjectCard />
          <VirtualWrapper count={projects.length}>
            {(index) => (
              <div className={cn({ 'pt-8': index > 0 })}>
                <ProjectCard
                  project={projects[index]}
                  // TODO: filterParamsString
                />
              </div>
            )}
          </VirtualWrapper>

          {hasNextPage ? (
            <div ref={inViewRef}>
              <Loader />
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
