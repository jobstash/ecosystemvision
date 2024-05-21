import { atom } from 'jotai';

import { ProjectDetails } from './schemas';

export const activeProjectIdAtom = atom<string | null>(null);
export const projectTotalCountAtom = atom<number | null>(null);
export const initProjectAtom = atom<ProjectDetails | null>(null);
