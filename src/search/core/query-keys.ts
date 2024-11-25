import { GetPillarInfoProps } from '@/search/core/types';

export const searchQueryKeys = {
  all: ['search'] as const,
  search: (query: string) => [...searchQueryKeys.all, 'search', query] as const,
  getPillarInfo: (props: GetPillarInfoProps) =>
    [...searchQueryKeys.all, 'pillarInfo', props] as const,
};

export type SearchQueryKeys = typeof searchQueryKeys;
