export const projectQueryKeys = {
  all: ['projects'] as const,
  details: (slug: string) =>
    [...projectQueryKeys.all, 'details', slug] as const,
  list: (params: string | Record<string, string>) => {
    const searchParams =
      typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString();

    return [...projectQueryKeys.all, 'list', searchParams] as const;
  },
  competitors: (slug: string) =>
    [...projectQueryKeys.all, 'competitors', slug] as const,
};

export type ProjectQueryKeys = typeof projectQueryKeys;
