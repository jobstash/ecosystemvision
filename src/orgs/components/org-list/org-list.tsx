import { Spinner } from '@heroui/spinner';

import { cn } from '@/shared/utils/cn';
import { reloadPage } from '@/shared/utils/reload-page';
import { InternalErrorResult } from '@/shared/components/internal-error-result';
import { Loader } from '@/shared/components/loader';
import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

// import { InitOrgCard } from '@/orgs/components/init-org-card';
import { OrgCard } from '@/orgs/components/org-card';

import { useOrgList } from './use-org-list';

interface Props {
  searchParams: string | Record<string, string>;
}

export const OrgList = ({ searchParams }: Props) => {
  const {
    orgs,
    error,
    inViewRef,
    hasNextPage,
    isSuccess,
    isPending: isPendingOrgs,
  } = useOrgList({ searchParams });

  const hasOrgs = orgs.length > 0;

  return (
    <>
      {isPendingOrgs ? (
        // <CardSkeleton />
        <div className="flex w-full justify-center">
          <Spinner size="md" color="white" />
        </div>
      ) : (
        isSuccess &&
        (hasOrgs ? (
          <>
            {/* <InitOrgCard /> */}
            <VirtualWrapper count={orgs.length} className="m-4 lg:m-8">
              {(index) => (
                <div className={cn({ 'pt-8': index > 0 })}>
                  <OrgCard
                    orgItem={orgs[index]}
                    // TODO: filterParamsString
                  />
                </div>
              )}
            </VirtualWrapper>
            {hasNextPage ? (
              <div ref={inViewRef} className="m-4 py-4 lg:m-8">
                <Loader />
              </div>
            ) : (
              <p className="px-4 lg:px-8">No more organizations available.</p>
            )}
          </>
        ) : (
          <p>No organizations found.</p>
        ))
      )}
      {error && <InternalErrorResult onReset={reloadPage} />}
    </>
  );
};
