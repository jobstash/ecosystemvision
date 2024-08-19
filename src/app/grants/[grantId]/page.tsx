// import { MAX_LIST_SIZE } from '@/shared/core/constants';

// import { getGrantList } from '@/grants/data/get-grant-list';

export { GranteeDetailsSection as default } from '@/grants/pages/grantee-details-section';

// export const generateStaticParams = async () => {
//   const grantListResponse = await getGrantList({
//     page: 1,
//     limit: MAX_LIST_SIZE,
//   });

//   const grantIds = Array.from(
//     new Set(grantListResponse.data.map((grant) => grant.id)),
//   );

//   return grantIds.map((grantId) => ({ grantId }));
// };
