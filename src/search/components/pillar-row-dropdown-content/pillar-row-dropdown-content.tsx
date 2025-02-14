'use client';

import React, { useMemo } from 'react';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Listbox, ListboxItem } from '@heroui/listbox';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { Spinner } from '@heroui/spinner';

import { capitalize } from '@/shared/utils/capitalize';
import { cn } from '@/shared/utils/cn';
import { formatNumber } from '@/shared/utils/format-number';
import { normalizeString } from '@/shared/utils/normalize-string';
import { CaretDownIcon } from '@/shared/components/icons/caret-down-icon';
import { CheckmarkIcon } from '@/shared/components/icons/checkmark-icon';
import { LockIcon } from '@/shared/components/icons/lock-icon';
import { Text } from '@/shared/components/text';

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
    total,
  } = usePillarDropdownInput({ nav, pillar, params, searchParams });

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

  const ariaLabel = `Search ...`;
  const hasActiveItems = activeItems.length > 0;
  const hasOptionItems = optionItems.length > 0;
  const showCounts = hasActiveItems || hasOptionItems;

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
          description={
            showCounts ? (
              <div className="flex w-full justify-between pt-2">
                {hasActiveItems ? (
                  <Text
                    className="text-xs text-white/50"
                    text={`Selected  ${capitalize(pillar)}: ${activeItems.length}`}
                  />
                ) : null}
                {hasOptionItems ? (
                  <Text
                    className="text-xs text-white/50"
                    text={`Total Count: ${formatNumber(total)}`}
                  />
                ) : null}
              </div>
            ) : null
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

              {hasActiveItems &&
                activeItems.map((label) => {
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

              {hasOptionItems &&
                optionItems.map((label, i) => (
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
