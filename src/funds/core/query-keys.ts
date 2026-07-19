export const fundQueryKeys = {
  all: ['funds'] as const,
  list: (searchParams: Record<string, string>) =>
    [...fundQueryKeys.all, 'list', searchParams] as const,
};
