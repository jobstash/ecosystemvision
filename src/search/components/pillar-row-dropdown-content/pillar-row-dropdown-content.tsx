'use client';

import React, { useMemo } from 'react';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Listbox, ListboxItem } from '@heroui/listbox';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { Spinner } from '@heroui/spinner';

import { cn } from '@/shared/utils/cn';
import { normalizeString } from '@/shared/utils/normalize-string';
import { CaretDownIcon } from '@/shared/components/icons/caret-down-icon';
import { CheckmarkIcon } from '@/shared/components/icons/checkmark-icon';
import { LockIcon } from '@/shared/components/icons/lock-icon';

import { usePillarDropdownInput } from '@/search/hooks/use-pillar-dropdown-input';
import { usePillarDropdownItems } from '@/search/hooks/use-pillar-dropdown-items';
import { usePillarDropdownOnAction } from '@/search/hooks/use-pillar-dropdown-on-action';

interface Props {
  nav: string;
  pillar: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  activeLabels: string[];
  isIndex: boolean;
}

export const PillarRowDropdownContent = ({
  nav,
  pillar,
  params,
  searchParams,
  activeLabels,
  isIndex,
}: Props) => {
  const {
    isLoadingRoute,
    value,
    onChange,
    list,
    onClear,
    inViewRef,
    isPendingDebounce,
  } = usePillarDropdownInput({ nav, pillar, searchParams });

  const activeLabelsSet = useMemo(() => {
    return new Set(activeLabels);
  }, [activeLabels]);

  const mainLabel = useMemo(() => {
    return activeLabels.find((label) => normalizeString(label) === params.item);
  }, [activeLabels, params.item]);

  const { onAction } = usePillarDropdownOnAction({
    nav,
    pillar,
    params,
    searchParams,
    activeLabelsSet,
    onClear,
    isIndex,
  });

  const { activeItems, optionItems } = usePillarDropdownItems({
    value,
    activeLabelsSet,
    items: list.items,
    mainLabel: mainLabel!,
    pillar,
  });

  const ariaLabel = `Search ${pillar}`;

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          radius="md"
          variant="bordered"
          className={cn('border border-white/20', {})}
          endContent={<CaretDownIcon />}
        >
          <span>More</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 p-4">
        <Input
          radius="sm"
          aria-label={ariaLabel}
          placeholder={ariaLabel}
          isDisabled={isLoadingRoute}
          value={value}
          onChange={onChange}
          endContent={
            list.isLoading ? <Spinner size="sm" color="white" /> : null
          }
        />

        <ScrollShadow
          className={cn('h-60 w-80', {
            'opacity-60 pointer-events-none': isLoadingRoute,
          })}
        >
          <Listbox
            hideEmptyContent
            aria-label={`${pillar} items`}
            disabledKeys={['no-results', 'empty', mainLabel!]}
            onAction={onAction}
          >
            <>
              {optionItems.length === 0 && !isPendingDebounce ? (
                <ListboxItem key="empty">No results found.</ListboxItem>
              ) : null}

              {activeItems.map((label) => {
                const classNames = {
                  base: 'py-3 text-accent2 font-bold bg-accent2/5 hover:bg-accent2/20 data-[hover="true"]:bg-accent2/20',
                };

                const isMainItem = params.item === normalizeString(label);
                const endContent = isMainItem ? (
                  <LockIcon />
                ) : (
                  <CheckmarkIcon />
                );

                return (
                  <ListboxItem
                    key={label}
                    classNames={classNames}
                    textValue={label}
                    endContent={endContent}
                    isReadOnly={isMainItem}
                  >
                    {label}
                  </ListboxItem>
                );
              })}

              {optionItems.map((label, i) => (
                <ListboxItem
                  key={label}
                  classNames={{
                    base: 'py-3',
                  }}
                  textValue={label}
                >
                  <div
                    key={label}
                    ref={i === optionItems.length - 1 ? inViewRef : undefined}
                  >
                    {label}
                  </div>
                </ListboxItem>
              ))}
            </>
          </Listbox>
        </ScrollShadow>
      </PopoverContent>
    </Popover>
  );
};
