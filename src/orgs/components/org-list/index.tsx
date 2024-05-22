import { cn } from '@/shared/utils/cn';
import { reloadPage } from '@/shared/utils/reload-page';
import { CardSkeleton } from '@/shared/components/card-skeleton';
import { InternalErrorResult } from '@/shared/components/internal-error-result';
import { Loader } from '@/shared/components/loader';
import { VirtualWrapper } from '@/shared/components/virtual-wrapper';

import { InitOrgCard } from '@/orgs/components/init-org-card';
import { OrgCard } from '@/orgs/components/org-card';
import { useFiltersContext } from '@/filters/providers/filters-provider/context';

import { useOrgList } from './use-org-list';

export const OrgList = () => {
  const {
    orgs,
    error,
    inViewRef,
    hasNextPage,
    isSuccess,
    isPending: isPendingOrgs,
  } = useOrgList();

  const hasOrgs = orgs.length > 0;

  const { isPendingFilters, filterParamsString } = useFiltersContext();

  const isPending = isPendingFilters || isPendingOrgs;

  return (
    <>
      {isPending ? (
        <CardSkeleton />
      ) : (
        isSuccess &&
        (hasOrgs ? (
          <>
            <InitOrgCard filterParamsString={filterParamsString} />
            <VirtualWrapper count={orgs.length}>
              {(index) => (
                <div className={cn({ 'pt-8': index > 0 })}>
                  <OrgCard
                    orgItem={orgs[index]}
                    filterParamsString={filterParamsString}
                  />
                </div>
              )}
            </VirtualWrapper>
            {hasNextPage ? (
              <div ref={inViewRef}>
                <Loader />
              </div>
            ) : (
              <p>No more organizations available.</p>
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
