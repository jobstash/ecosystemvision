import { useGranteeDetails } from '@/grants/hooks/use-grantee-details';
import { useGranteeListQuery } from '@/grants/hooks/use-grantee-list-query';

/**
 * Fetches grantee data based on the grant ID and grantee ID.
 * If the grantee ID is not provided, it fetches the first grantee in the list.
 * @param grantId - The grant slug or param.
 * @param granteeId - The grantee slug or param (if available).
 */
export const useGranteeFetch = (grantId: string, granteeId?: string) => {
  // Determine if the grantee list fetch should be enabled based on the presence of granteeId
  const shouldFetchGranteeList = !granteeId;

  const {
    data: granteesData,
    isLoading: isLoadingGrantees,
    error: granteesError,
  } = useGranteeListQuery(grantId, shouldFetchGranteeList);
  const granteeItem = granteesData?.pages.flatMap((page) => page.data).at(0);

  const {
    data: granteeData,
    isLoading: isLoadingGrantee,
    error: granteeError,
  } = useGranteeDetails(grantId, granteeId ?? granteeItem?.slug);

  const isLoading = (!granteeId && isLoadingGrantees) || isLoadingGrantee;

  const granteesErrorMessage = shouldFetchGranteeList
    ? granteesError?.message
    : null;
  const granteeErrorMessage = granteeError?.message;
  const errorMessage = granteesErrorMessage || granteeErrorMessage;

  return {
    granteeData,
    isLoading,
    errorMessage,
  };
};
