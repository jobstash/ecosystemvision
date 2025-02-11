'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Chip } from '@heroui/chip';
import { useAtom } from 'jotai';

import { capitalize } from '@/shared/utils/capitalize';
import { normalizeString } from '@/shared/utils/normalize-string';

import {
  currentFilterParamsAtom,
  isActiveAllFiltersAtom,
} from '@/search/core/atoms';
import { usePillarDropdownInput } from '@/search/hooks/use-pillar-dropdown-input';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  nav: string;
  pillar: string;
  searchParams: Record<string, string>;
  isPillarPageSelection: boolean;
}

export const PillarSelection = ({
  nav,
  pillar,
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
  const { startTransition } = usePillarRoutesContext();

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
      <Autocomplete
        className="max-w-sm"
        label={capitalize(pillar)}
        labelPlacement="outside"
        placeholder={`Search ${pillar} ...`}
        isDisabled={isLoadingRoute}
        isLoading={isLoading}
        listboxProps={{
          emptyContent: isLoading ? 'Loading ...' : 'No results found.',
        }}
        defaultItems={optionItems}
        value={value}
        inputValue={value}
        onInputChange={onChangeValue}
        onSelectionChange={addSelection}
      >
        {optionItems.map(({ label }, i) => (
          <AutocompleteItem key={label} textValue={label}>
            <div ref={i === optionItems.length - 1 ? inViewRef : undefined}>
              {label}
            </div>
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <div className="flex flex-wrap items-center gap-4">
        {currentSelections.map((label) => (
          <Chip key={label} onClose={() => removeSelection(label)}>
            {label}
          </Chip>
        ))}
      </div>
    </div>
  );
};
