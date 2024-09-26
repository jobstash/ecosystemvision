export const searchQueryKeys = {
  all: ['search'] as const,
  search: (query: string) => [...searchQueryKeys.all, 'search', query] as const,
};

export type SearchQueryKeys = typeof searchQueryKeys;
