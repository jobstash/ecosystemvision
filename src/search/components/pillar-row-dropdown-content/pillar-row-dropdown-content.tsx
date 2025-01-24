'use client';

import { useMemo } from 'react';

import { Input } from '@heroui/input';
import { Listbox, ListboxItem } from '@heroui/listbox';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { Spinner } from '@heroui/spinner';

import { cn } from '@/shared/utils/cn';
import { normalizeString } from '@/shared/utils/normalize-string';

import { CheckmarkIcon } from './checkmark-icon';
import { LockIcon } from './lock-icon';
import { useDropdownInput } from './use-dropdown-input';
import { useDropdownItems } from './use-dropdown-items';
import { useDropdownOnAction } from './use-dropdown-on-action';

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
    placeholder,
    isLoadingRoute,
    value,
    onChange,
    list,
    onClear,
    inViewRef,
    isPendingDebounce,
  } = useDropdownInput({ nav, pillar });

  const activeLabelsSet = useMemo(() => {
    return new Set(activeLabels);
  }, [activeLabels]);

  const mainLabel = useMemo(() => {
    return activeLabels.find((label) => normalizeString(label) === params.item);
  }, [activeLabels, params.item]);

  const { onAction } = useDropdownOnAction({
    nav,
    pillar,
    params,
    searchParams,
    activeLabelsSet,
    onClear,
    isIndex,
  });

  const { activeItems, optionItems } = useDropdownItems({
    value,
    activeLabelsSet,
    items: list.items,
    mainLabel: mainLabel!,
    pillar,
  });

  const isLoading = (list.isLoading || isPendingDebounce) && value.length > 0;

  return (
    <>
      <Input
        radius="sm"
        aria-label={`Search ${pillar}`}
        placeholder={placeholder}
        isDisabled={isLoadingRoute}
        value={value}
        onChange={onChange}
        endContent={list.isLoading ? <Spinner size="sm" color="white" /> : null}
      />
      <ScrollShadow
        className={cn('h-60 w-80', {
          'opacity-60 pointer-events-none': isLoadingRoute,
        })}
      >
        <Listbox
          hideEmptyContent
          aria-label={`${pillar} items`}
          disabledKeys={['no-results', 'empty', 'loading', mainLabel!]}
          onAction={onAction}
        >
          {isLoading ? (
            <ListboxItem key="loading">Loading ...</ListboxItem>
          ) : (
            <>
              {optionItems.length === 0 ? (
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
          )}
        </Listbox>
      </ScrollShadow>
    </>
  );
};
