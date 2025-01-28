'use client';

import { Spinner } from '@heroui/spinner';

import { cn } from '@/shared/utils/cn';
import { reloadPage } from '@/shared/utils/reload-page';
import { InternalErrorResult } from '@/shared/components/internal-error-result';
import { Loader } from '@/shared/components/loader';
import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

// import { InitProjectCard } from '@/projects/components/init-project-card';
import { ProjectCard } from '@/projects/components/project-card';

import { useProjectList } from './use-project-list';

interface Props {
  searchParams: string | Record<string, string>;
}

export const ProjectList = ({ searchParams }: Props) => {
  const {
    projects,
    error,
    inViewRef,
    hasNextPage,
    isSuccess,
    isPending: isPendingList,
  } = useProjectList({ searchParams });
  const hasProjects = projects.length > 0;

  return (
    <>
      {error && <InternalErrorResult onReset={reloadPage} />}
      {isPendingList ? (
        // <CardSkeleton />
        <div className="flex w-full justify-center pt-8">
          <Spinner size="md" color="white" />
        </div>
      ) : isSuccess && hasProjects ? (
        <>
          {/* <InitProjectCard /> */}
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
            <p>No more projects to display.</p>
          )}
        </>
      ) : (
        <p>Empty UI</p>
      )}
    </>
  );
};
