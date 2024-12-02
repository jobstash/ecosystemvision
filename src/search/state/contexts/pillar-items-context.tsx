'use client';

import { createContext } from 'react';

import { TPillarItem } from '@/search/core/types';

interface PillarItemsCtx {
  isLoading: boolean;
  mainItems: TPillarItem[];
  altItems: TPillarItem[];
  selectDropdownItem: (item: TPillarItem, isMain: boolean) => void;
}

export const PillarItemsContext = createContext<PillarItemsCtx | null>(null);
