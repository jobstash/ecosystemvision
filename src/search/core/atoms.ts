import { atom } from 'jotai';

import { TPillarItemMap } from '@/search/core/types';

export const searchQueryAtom = atom<string>('');
export const hiddenMainPillarItemsAtom = atom<TPillarItemMap>(new Map());
export const hiddenAltPillarItemsAtom = atom<TPillarItemMap>(new Map());
