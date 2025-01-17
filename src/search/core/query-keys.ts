import {
  GetPillarInfoProps,
  GetPillarInputLabelsProps,
  GetPillarItemsProps,
  PillarSearchNavFilter,
} from '@/search/core/types';

export const searchQueryKeys = {
  all: ['search'] as const,
  search: (query: string, nav?: PillarSearchNavFilter) =>
    [...searchQueryKeys.all, 'search', query, nav] as const,
  getPillarItems: (props: GetPillarItemsProps) =>
    [...searchQueryKeys.all, 'pillar-items', props] as const,
  getPillarInfo: (props: GetPillarInfoProps) =>
    [...searchQueryKeys.all, 'pillar-info', props] as const,
  getPillarInputLabels: ({ nav, pillars, inputs }: GetPillarInputLabelsProps) =>
    [
      ...searchQueryKeys.all,
      'pillar-input-labels',
      nav,
      pillars,
      inputs,
    ] as const,
};

export type SearchQueryKeys = typeof searchQueryKeys;
