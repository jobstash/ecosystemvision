'use client';

import { useMemo } from 'react';

import { Input } from '@heroui/input';
import { Listbox, ListboxItem } from '@heroui/listbox';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { Spinner } from '@heroui/spinner';

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
      <Input
        radius="sm"
        aria-label={ariaLabel}
        placeholder={ariaLabel}
        isDisabled={isLoadingRoute}
        value={value}
        onChange={onChange}
        endContent={isLoading ? <Spinner size="sm" color="white" /> : null}
      />

      <ScrollShadow
        className={cn('h-60 w-80', {
          'opacity-60 pointer-events-none': isLoadingRoute,
        })}
      >
        <Listbox
          hideEmptyContent
          aria-label={`${pillar} items`}
          disabledKeys={['no-results', 'empty']}
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

              return (
                <ListboxItem
                  key={label}
                  classNames={classNames}
                  textValue={label}
                  endContent={<CheckmarkIcon />}
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
    </>
  );
};
