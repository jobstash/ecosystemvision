import { Spinner } from '@heroui/spinner';

import { DraggableWrapper } from '@/shared/components/draggable-wrapper';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { LabeledItem } from '@/search/core/types';

import { PillarLoadingWrapper } from '../pillar-loading-wrapper';

import { PillarSearchCloseButton } from './pillar-search-close-button';
import { PillarSearchInput } from './pillar-search-input';
import { PillarSearchInputItem } from './pillar-search-input-item';

interface Props {
  mainLabel: string;
  labeledItems: LabeledItem[];
}

export const PillarSearch = ({ mainLabel, labeledItems }: Props) => {
  const items = moveMainItemToFront(labeledItems, mainLabel);
  return (
    <PillarLoadingWrapper>
      <div className="flex min-w-96 items-center gap-2 rounded-xl bg-white/10 px-3 py-1">
        <PillarLoadingWrapper
          className="size-6"
          shouldReduceOpacity={false}
          loadingIcon={<Spinner size="sm" color="white" />}
        >
          <SearchIcon />
        </PillarLoadingWrapper>

        <PillarSearchInput isFullWidth={items.length === 0} />

        {items.length > 0 && (
          <DraggableWrapper className="flex items-center gap-x-4">
            {items.map((item) => (
              <PillarSearchInputItem key={item.label} item={item} />
            ))}
          </DraggableWrapper>
        )}

        <PillarSearchCloseButton />
      </div>
    </PillarLoadingWrapper>
  );
};

const moveMainItemToFront = (items: LabeledItem[], mainLabel: string) => {
  const mainItem = items.find((item) => item.label === mainLabel);
  if (!mainItem) {
    return items;
  }

  return [mainItem, ...items.filter((item) => item.label !== mainLabel)];
};
