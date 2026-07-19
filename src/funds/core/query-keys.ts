export const fundQueryKeys = {
  all: ['funds'] as const,
  list: () => [...fundQueryKeys.all, 'list'] as const,
};
