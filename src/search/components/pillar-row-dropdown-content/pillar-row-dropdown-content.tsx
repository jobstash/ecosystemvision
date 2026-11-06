'use client';

import React, { useMemo } from 'react';

import { Button, InputGroup, ListBox, Popover, ScrollShadow, Spinner } from '@heroui/react';

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
    <Popover>
      <Button variant="outline" className="rounded-xl border border-white/20">
        <span>More</span><CaretDownIcon />
      </Button>
      <Popover.Content placement="bottom end">
      <Popover.Dialog aria-label={`More ${pillar}`} className="flex flex-col gap-4 p-4">
        <InputGroup className="rounded-lg">
          <InputGroup.Input
            aria-label={ariaLabel}
            placeholder={ariaLabel}
            disabled={isLoadingRoute}
            value={value}
            onChange={onChange}
          />
          <InputGroup.Suffix>
            {list.isLoading && <Spinner size="sm" color="current" />}
          </InputGroup.Suffix>
        </InputGroup>
        {showCounts && (
          <div className="flex w-full justify-between pt-2">
            {hasActiveItems && <Text className="text-xs text-white/50" text={`Selected ${capitalize(pillar)}: ${activeItems.length}`} />}
            {hasOptionItems && <Text className="text-xs text-white/50" text={`Total Count: ${formatNumber(total)}`} />}
          </div>
        )}

        <ScrollShadow
          className={cn('h-60 w-80', {
            'opacity-60 pointer-events-none': isLoadingRoute,
          })}
        >
          <ListBox
            aria-label={`${pillar} items`}
            disabledKeys={['no-results', 'empty', ...(mainLabel ? [mainLabel] : [])]}
            onAction={onAction}
          >
            {optionItems.length === 0 && !isPendingDebounce ? (
              <ListBox.Item id="empty" textValue="No results found.">No results found.</ListBox.Item>
            ) : null}
            {activeItems.map((label) => (
              <ListBox.Item
                key={label}
                id={label}
                className="bg-accent2/5 py-3 font-bold text-accent2 hover:bg-accent2/20 data-[hovered]:bg-accent2/20"
                textValue={label}
              >
                {label}
                {params.item === normalizeString(label) ? <LockIcon /> : <CheckmarkIcon />}
              </ListBox.Item>
            ))}
            {optionItems.map((label, i) => (
              <ListBox.Item key={label} id={label} className="py-3" textValue={label}>
                <div ref={i === optionItems.length - 1 ? inViewRef : undefined}>{label}</div>
              </ListBox.Item>
            ))}
          </ListBox>
        </ScrollShadow>
      </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};
