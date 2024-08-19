export const grantQueryKeys = {
  all: ['grants'] as const,
  list: (params: string | Record<string, string>) => {
    const searchParams =
      typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString();

    return [...grantQueryKeys.all, 'list', searchParams] as const;
  },
  grant: (grantId: string) => {
    return [...grantQueryKeys.all, 'grant', grantId] as const;
  },
  grantees: (grantId: string, params: string | Record<string, string>) => {
    const searchParams =
      typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString();

    return [
      ...grantQueryKeys.grant(grantId),
      'grantees',
      grantId,
      searchParams,
    ] as const;
  },
  grantee: (grantId: string, granteeId: string) => {
    return [...grantQueryKeys.grant(grantId), 'grantee', granteeId] as const;
  },
} as const;

export type GrantQueryKeys = typeof grantQueryKeys;
