import { atom } from 'jotai';

export const initialSelectedPillarItems = atom<
  { label: string; pillar: string }[]
>([]);
