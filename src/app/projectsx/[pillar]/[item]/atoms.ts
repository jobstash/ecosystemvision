import { atom } from 'jotai';

import { LabeledItem } from './types';

export const pillarSearchInputItems = atom<LabeledItem[]>([]);
