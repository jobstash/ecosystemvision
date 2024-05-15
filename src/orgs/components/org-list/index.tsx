import { Spinner } from '@nextui-org/spinner';

import { cn } from '@/shared/utils/cn';
import { reloadPage } from '@/shared/utils/reload-page';
import { InternalErrorResult } from '@/shared/components/internal-error-result';
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

  const { isPendingFilters, filterSearchParams } = useFiltersContext();

  const isPending = isPendingFilters || isPendingOrgs;

  const filterParamsString =
    filterSearchParams.size > 0 ? `?${filterSearchParams}` : '';

  if (error) {
    return <InternalErrorResult onReset={reloadPage} />;
  }

  if (isPending) {
    return <Spinner size="sm" color="white" />;
  }

  if (isSuccess) {
    if (hasOrgs) {
      return (
        <>
          <div>
            <InitOrgCard filterParamsString={filterParamsString} />
          </div>
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
              <Spinner size="sm" color="white" />
            </div>
          ) : (
            <p>No more organizations available.</p>
          )}
        </>
      );
    } else {
      return <p>No organizations found.</p>;
    }
  }

  return null;
};
