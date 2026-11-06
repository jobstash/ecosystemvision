'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { Button, Chip, ComboBox, Input, Label, ListBox, Spinner } from '@heroui/react';
import { useAtom } from 'jotai';

import { capitalize } from '@/shared/utils/capitalize';
import { normalizeString } from '@/shared/utils/normalize-string';

import {
  currentFilterParamsAtom,
  isActiveAllFiltersAtom,
} from '@/search/core/atoms';
import { usePillarDropdownInput } from '@/search/hooks/use-pillar-dropdown-input';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

interface Props {
  nav: string;
  pillar: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  isPillarPageSelection: boolean;
}

export const PillarSelection = ({
  nav,
  pillar,
  params,
  searchParams,
  isPillarPageSelection,
}: Props) => {
  const {
    isLoadingRoute,
    value,
    onChangeValue,
    onClear,
    list,
    isPendingDebounce,
    inViewRef,
  } = usePillarDropdownInput({
    nav,
    pillar,
    params,
    searchParams,
    hasOffset: false,
  });

  const isLoading = list.isLoading || isPendingDebounce;

  const [currentFilterParams, setCurrentFilterParams] = useAtom(
    currentFilterParamsAtom,
  );

  const currentSelections = useMemo(() => {
    return currentFilterParams[pillar]?.current || [];
  }, [currentFilterParams, pillar]);

  const optionItems = useMemo(() => {
    const activeSlugs = new Set(currentSelections);

    return list.items
      .filter((label) => !activeSlugs.has(label))
      .map((label) => ({ label }));
  }, [currentSelections, list.items]);

  const router = useRouter();
  const { startTransition } = usePendingRoute();

  const [, setIsActveAllFilters] = useAtom(isActiveAllFiltersAtom);
  const redirectToPillarPage = (item: string) => {
    setIsActveAllFilters(false);
    startTransition(() => {
      router.push(`/${nav}/${pillar}/${normalizeString(item)}`);
    });
  };

  const addSelection = (key: React.Key | null) => {
    if (!key) return;

    if (isPillarPageSelection) {
      redirectToPillarPage(key as string);
      return;
    }

    onClear();
    setCurrentFilterParams((prev) => {
      return {
        ...prev,
        [pillar]: {
          ...prev[pillar],
          current: [...currentSelections, key as string],
        },
      };
    });
  };

  const removeSelection = (key: string) => {
    setCurrentFilterParams((prev) => {
      return {
        ...prev,
        [pillar]: {
          ...prev[pillar],
          current: currentSelections.filter((item) => item !== key),
        },
      };
    });
  };

  return (
    <div className="space-y-8">
      <ComboBox
        className="max-w-sm"
        isDisabled={isLoadingRoute}
        items={optionItems}
        inputValue={value}
        onInputChange={onChangeValue}
        value={null}
        onChange={addSelection}
        allowsEmptyCollection
      >
        <Label>{capitalize(pillar)}</Label>
        <ComboBox.InputGroup>
          <Input placeholder={`Search ${pillar} ...`} />
          {isLoading && <Spinner size="sm" color="current" />}
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Popover>
          <ListBox
            renderEmptyState={() => isLoading ? 'Loading ...' : 'No results found.'}
          >
            {optionItems.map(({ label }, i) => (
              <ListBox.Item key={label} id={label} textValue={label}>
                <div ref={i === optionItems.length - 1 ? inViewRef : undefined}>{label}</div>
              </ListBox.Item>
            ))}
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>

      <div className="flex flex-wrap items-center gap-4">
        {currentSelections.map((label) => (
          <Chip key={label}>
            <Chip.Label>{label}</Chip.Label>
            <Button isIconOnly size="sm" variant="ghost"
              className="size-5 min-h-0 min-w-0"
              aria-label={`Remove ${label}`}
              onPress={() => removeSelection(label)}>
              <span aria-hidden="true">×</span>
            </Button>
          </Chip>
        ))}
      </div>
    </div>
  );
};
