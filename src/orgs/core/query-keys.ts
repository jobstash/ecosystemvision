export const orgQueryKeys = {
  all: ['orgs'] as const,
  details: (slug: string) => [...orgQueryKeys.all, 'details', slug] as const,
  list: (params: string | Record<string, string>) => {
    const searchParams =
      typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString();

    return [...orgQueryKeys.all, 'list', searchParams] as const;
  },
  search: (searchParams: Record<string, string>) => [...orgQueryKeys.all, 'search', searchParams]
};

export type OrgQueryKeys = typeof orgQueryKeys;
