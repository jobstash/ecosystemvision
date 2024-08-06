export const grantQueryKeys = {
  all: ['grants'] as const,
  list: (params: string | Record<string, string>) => {
    const searchParams =
      typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString();

    return [...grantQueryKeys.all, 'list', searchParams] as const;
  },
  grantees: (grantId: string, params: string | Record<string, string>) => {
    const searchParams =
      typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString();

    return [...grantQueryKeys.all, 'grantees', grantId, searchParams] as const;
  },
  project: (projectId: string) =>
    [...grantQueryKeys.all, 'project', projectId] as const,
} as const;

export type GrantQueryKeys = typeof grantQueryKeys;
