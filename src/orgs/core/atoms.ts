import { atom } from 'jotai';

import { OrgDetails } from './schemas';

export const activeOrgSlugAtom = atom<string | null>(null);
export const initOrgAtom = atom<OrgDetails | null>(null);
export const orgTotalCountAtom = atom<number | null>(null);
