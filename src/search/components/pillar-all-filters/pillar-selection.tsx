'use client';

import { useMemo } from 'react';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Chip } from '@heroui/chip';
import { useAtom } from 'jotai';

import { capitalize } from '@/shared/utils/capitalize';

import { currentFilterParamsAtom } from '@/search/core/atoms';
import { usePillarDropdownInput } from '@/search/hooks/use-pillar-dropdown-input';

interface Props {
  nav: string;
  pillar: string;
}

export const PillarSelection = ({ nav, pillar }: Props) => {
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

  const addSelection = (key: React.Key | null) => {
    if (key) {
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
    }
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

  // return (
  //   <div className="space-y-8">
  //     <Input
  //       radius="sm"
  //       aria-label={ariaLabel}
  //       placeholder={ariaLabel}
  //       isDisabled={isLoadingRoute}
  //       value={value}
  //       onChange={onChange}
  //       endContent={list.isLoading ? <Spinner size="sm" color="white" /> : null}
  //     />

  //     <ScrollShadow
  //       className={cn('h-60 w-80', {
  //         'opacity-60 pointer-events-none': isLoadingRoute,
  //       })}
  //     >
  //       <Listbox
  //         hideEmptyContent
  //         aria-label={`${pillar} items`}
  //         disabledKeys={['no-results', 'empty', mainLabel!]}
  //         onAction={onAction}
  //       >
  //         <>
  //           {optionItems.length === 0 && !isPendingDebounce ? (
  //             <ListboxItem key="empty">No results found.</ListboxItem>
  //           ) : null}

  //           {optionItems.map((label, i) => (
  //             <ListboxItem
  //               key={label}
  //               classNames={{
  //                 base: 'py-3',
  //               }}
  //               textValue={label}
  //             >
  //               <div
  //                 key={label}
  //                 ref={i === optionItems.length - 1 ? inViewRef : undefined}
  //               >
  //                 {label}
  //               </div>
  //             </ListboxItem>
  //           ))}
  //         </>
  //       </Listbox>
  //     </ScrollShadow>

  //     {/* <div className="flex flex-wrap items-center gap-4">
  //       {activeSlugs.map((item) => {
  //         return (
  //           <Chip key={item.label} onClose={() => onClose(item)}>
  //             {item.label}
  //           </Chip>
  //         );
  //       })}
  //     </div> */}
  //   </div>
  // );
};

// const addItem = (item: Item) => {
//   setCurrentFilterParams((prev) => {
//     return {
//       ...prev,
//       [pillar]: [...activeSlugs, item.slug].join(','),
//     };
//   });
// };

// const removeItem = (item: Item) => {
//   setCurrentFilterParams((prev) => {
//     return {
//       ...prev,
//       [pillar]: activeSlugs
//         .filter((activeItem) => activeItem !== item.slug)
//         .join(','),
//     };
//   });
// };

// const onAction = (item: Item) => addItem(item);
// const onClose = (item: Item) => removeItem(item);
