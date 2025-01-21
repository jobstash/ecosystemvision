import { atom } from 'jotai';

export const searchQueryAtom = atom<string>('');
export const isActiveSearchAtom = atom<boolean>(false);

type TPillarItemMap = Record<string, string[]>;
export const hiddenPillarItemsAtom = atom<TPillarItemMap>({});
