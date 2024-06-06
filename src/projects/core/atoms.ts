import { atom } from 'jotai';

import { ProjectDetails } from './schemas';

export const activeProjectSlugAtom = atom<string | null>(null);
export const projectTotalCountAtom = atom<number | null>(null);
export const initProjectAtom = atom<ProjectDetails | null>(null);
export const projectFiltersSearchParamsAtom = atom<URLSearchParams>(
  new URLSearchParams(),
);
