'use client';

import { useMemo } from 'react';

import { Button } from '@nextui-org/button';
import { Popover, PopoverTrigger } from '@nextui-org/popover';
import { PrimitiveAtom, useAtomValue } from 'jotai';

import { cn } from '@/shared/utils/cn';
import { normalizeString } from '@/shared/utils/normalize-string';

import { TPillarItemMap } from '@/search/core/types';
import { PillarItemsDropdownContent } from '@/search/components/pillar-items-dropdown-content';

interface Props {
  pillarSlug: string;
  itemParam: string;
  hiddenItemsAtom: PrimitiveAtom<TPillarItemMap>;
}

export const PillarItemsDropdown = ({
  pillarSlug,
  itemParam,
  hiddenItemsAtom,
}: Props) => {
  const hiddenItemsAtomValue = useAtomValue(hiddenItemsAtom);

  const { hiddenItems, hiddenItem } = useMemo(() => {
    const hiddenItems = Array.from(hiddenItemsAtomValue.values());
    const hiddenItem = hiddenItems.find(
      ({ label }) => normalizeString(label) === itemParam,
    );

    // If hiddenItem is found, unshift it to first position
    if (hiddenItem) {
      const hiddenItemIndex = hiddenItems.findIndex(
        ({ label }) => normalizeString(label) === itemParam,
      );
      hiddenItems.splice(hiddenItemIndex, 1);
      hiddenItems.unshift(hiddenItem);
    }

    return { hiddenItems, hiddenItem };
  }, [hiddenItemsAtomValue, itemParam]);

  return (
    <div className="flex justify-end p-1 pt-0">
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button
            radius="md"
            variant="bordered"
            className={cn('border border-white/20', {
              'text-accent2 border-accent2/60': !!hiddenItem,
            })}
            endContent={
              <CaretDown
                className={cn({ 'stroke-2 text-accent2': !!hiddenItem })}
              />
            }
          >
            <span className={cn({ 'font-bold': !!hiddenItem })}>More</span>
          </Button>
        </PopoverTrigger>
        <PillarItemsDropdownContent
          pillarSlug={pillarSlug}
          itemParam={itemParam}
          items={hiddenItems}
        />
      </Popover>
    </div>
  );
};

const CaretDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    strokeWidth="1.5"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
    className={cn('size-4', props.className)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    ></path>
  </svg>
);
