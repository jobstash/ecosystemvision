import { GetPillarInfoProps } from '@/search/core/types';

export const searchQueryKeys = {
  all: ['search'] as const,
  search: (query: string) => [...searchQueryKeys.all, 'search', query] as const,
  getPillarItems: (props: Omit<GetPillarInfoProps, 'item' | 'item2'>) =>
    [...searchQueryKeys.all, 'pillarItems', props] as const,
  getPillarInfo: (props: GetPillarInfoProps) =>
    [...searchQueryKeys.all, 'pillarInfo', props] as const,
};

export type SearchQueryKeys = typeof searchQueryKeys;
