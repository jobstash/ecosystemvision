'use client';

import { normalizeString } from '@/shared/utils/normalize-string';

import { TPillarItem } from '@/search/core/types';
import {
  hiddenAltPillarItemsAtom,
  hiddenMainPillarItemsAtom,
} from '@/search/core/atoms';
import { PillarItem } from '@/search/components/pillar-item';
import { PillarItemsDropdown } from '@/search/components/pillar-items-dropdown';

interface Props {
  pillarSlug: string;
  itemParam: string;
  items: TPillarItem[];
  isMain?: boolean;
}

export const PillarItems = ({
  pillarSlug,
  itemParam,
  items,
  isMain,
}: Props) => {
  if (items.length === 0) return null;

  const hiddenItemsAtom = isMain
    ? hiddenMainPillarItemsAtom
    : hiddenAltPillarItemsAtom;

  return (
    <div
      key={itemParam}
      className="relative flex h-14 gap-4 overflow-hidden p-1"
    >
      <div className="flex max-w-fit flex-wrap gap-4">
        {items.map((item) => (
          <PillarItem
            key={item.label}
            item={item}
            isActive={checkIsActive(itemParam, item.label)}
            hiddenItemsAtom={hiddenItemsAtom}
          />
        ))}
      </div>
      <div className="shrink-0 grow">
        <PillarItemsDropdown
          pillarSlug={pillarSlug}
          itemParam={itemParam}
          hiddenItemsAtom={hiddenItemsAtom}
        />
      </div>
    </div>
  );
};

const checkIsActive = (activeItemParam: string, itemLabel: string) =>
  normalizeString(itemLabel) === activeItemParam ||
  (itemLabel.toLowerCase().includes('all') && activeItemParam === 'all');
