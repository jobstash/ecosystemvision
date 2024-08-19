import { useGranteeDetails } from '@/grants/hooks/use-grantee-details';
import { useGranteeListQuery } from '@/grants/hooks/use-grantee-list-query';

/**
 * Fetches grantee data based on the grant ID and grantee ID.
 * If the grantee ID is not provided, it fetches the first grantee in the list.
 * @param grantId - The grant id.
 * @param granteeId - The grantee (if available).
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
  } = useGranteeDetails(grantId, granteeId ?? granteeItem?.id);

  const isLoading = (!granteeId && isLoadingGrantees) || isLoadingGrantee;
  const errorMessage = granteesError?.message || granteeError?.message;

  return {
    granteeData,
    isLoading,
    errorMessage,
  };
};
