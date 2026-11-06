'use client';

import { useMemo } from 'react';

import { InputGroup, ListBox, ScrollShadow, Spinner } from '@heroui/react';

import { cn } from '@/shared/utils/cn';
import { CheckmarkIcon } from '@/shared/components/icons/checkmark-icon';

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
  overrideHiddenItems: string[];
}

export const PillarFilterDropdownContent = (props: Props) => {
  const {
    nav,
    pillar,
    params,
    searchParams,
    activeLabels,
    isIndex,
    overrideHiddenItems,
  } = props;

  const activeLabelsSet = useMemo(() => {
    return new Set(activeLabels);
  }, [activeLabels]);

  const {
    isLoadingRoute,
    value,
    onChange,
    list,
    onClear,
    inViewRef,
    isPendingDebounce,
  } = usePillarDropdownInput({ nav, pillar, params, searchParams });

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
    pillar,
    overrideHiddenItems,
  });

  const isLoading = list.isLoading || isPendingDebounce;

  const ariaLabel = `Search ${pillar}`;

  return (
    <>
      <InputGroup className="rounded-lg">
        <InputGroup.Input
          aria-label={ariaLabel}
          placeholder={ariaLabel}
          disabled={isLoadingRoute}
          value={value}
          onChange={onChange}
        />
        <InputGroup.Suffix>
          {isLoading && <Spinner size="sm" color="current" />}
        </InputGroup.Suffix>
      </InputGroup>

      <ScrollShadow
        className={cn('h-60 w-80', {
          'opacity-60 pointer-events-none': isLoadingRoute,
        })}
      >
        <ListBox
          aria-label={`${pillar} items`}
          disabledKeys={['no-results', 'empty']}
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
              {label}<CheckmarkIcon />
            </ListBox.Item>
          ))}
          {optionItems.map((label, i) => (
            <ListBox.Item key={label} id={label} className="py-3" textValue={label}>
              <div ref={i === optionItems.length - 1 ? inViewRef : undefined}>
                {label}
              </div>
            </ListBox.Item>
          ))}
        </ListBox>
      </ScrollShadow>
    </>
  );
};
