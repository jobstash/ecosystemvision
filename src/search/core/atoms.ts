import { atom } from 'jotai';

export const searchQueryAtom = atom<string>('');

type TPillarItemMap = Record<string, string[]>;
export const hiddenPillarItemsAtom = atom<TPillarItemMap>({});
