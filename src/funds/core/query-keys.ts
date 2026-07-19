export const fundQueryKeys = {
  all: ['funds'] as const,
  sectors: (searchParams: Record<string, string>) =>
    [...fundQueryKeys.all, 'sectors', searchParams] as const,
  rounds: (searchParams: Record<string, string>) =>
    [...fundQueryKeys.all, 'rounds', searchParams] as const,
  list: (searchParams: Record<string, string>) =>
    [...fundQueryKeys.all, 'list', searchParams] as const,
};
