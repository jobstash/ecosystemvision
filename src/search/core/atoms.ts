import { atom } from 'jotai';

interface SearchQueryText {
  actual: string;
  debounced: string;
}

export const searchQueryAtom = atom<SearchQueryText>({
  actual: '',
  debounced: '',
});
export const isActiveSearchAtom = atom<boolean>(false);

type TPillarItemMap = Record<string, string[]>;
export const hiddenPillarItemsAtom = atom<TPillarItemMap>({});
