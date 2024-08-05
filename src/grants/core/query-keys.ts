export const grantQueryKeys = {
  all: ['grants'] as const,
  list: (params: string | Record<string, string>) => {
    const searchParams =
      typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString();

    return [...grantQueryKeys.all, 'list', searchParams] as const;
  },
};

export type GrantQueryKeys = typeof grantQueryKeys;
