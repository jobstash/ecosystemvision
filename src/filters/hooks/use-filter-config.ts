import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME, RouteSection } from '@/shared/core/constants';
import { MW_URL } from '@/shared/core/envs';
import { mwGET } from '@/shared/utils/mw-get';

import { filterQueryKeys } from '@/filters/core/query-keys';
import { filterConfigResponseSchema } from '@/filters/core/schemas';
import { sanitizeFilterParams } from '@/filters/utils/sanitize-filter-params';

const getFilterConfig = async (path: `/${RouteSection}`) => {
  const url = `${MW_URL}${path}/filters`;

  return mwGET({
    url,
    label: 'getFilterConfig',
    responseSchema: filterConfigResponseSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};

export const useFilterConfig = (
  searchParams: string | Record<string, string>,
  routeSection: RouteSection,
) => {
  const query = useQuery({
    queryKey: filterQueryKeys.list(searchParams, routeSection),
    queryFn: () => getFilterConfig(`/${routeSection}`),
    staleTime: QUERY_STALETIME.DEFAULT,
    select: (data) =>
      Object.values(data)
        .filter((config) => config.show)
        .sort(({ position: p1 }, { position: p2 }) => p1 - p2),
  });

  const filterSearchParams = sanitizeFilterParams(
    searchParams,
    query.data ?? [],
  );

  return { ...query, filterSearchParams };
};
