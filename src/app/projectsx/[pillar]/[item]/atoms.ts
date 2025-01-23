import { atom } from 'jotai';

import { LabeledItem } from './types';

export const pillarSearchInputItems = atom<LabeledItem[]>([]);

interface SearchQueryText {
  actual: string;
  debounced: string;
}

export const searchQueryAtom = atom<SearchQueryText>({
  actual: '',
  debounced: '',
});

export const isActiveSearchAtom = atom<boolean>(false);
