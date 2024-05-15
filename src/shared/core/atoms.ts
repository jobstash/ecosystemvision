import { atom } from 'jotai';

export const showFullscreenNavAtom = atom<boolean>(false);

export const initPathAtom = atom<string | null>(null);
