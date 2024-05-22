'use client';

import { Button } from '@nextui-org/button';

import { FilterIcon } from '@/shared/components/icons/filter-icon';
import { PrimaryButton } from '@/shared/components/primary-button';

import { useFilterToggler } from './use-filter-toggler';

interface Props {
  children: React.ReactNode;
  countSection: React.ReactNode;
}

export const FilterToggler = ({ children, countSection }: Props) => {
  const {
    // initializedFilters,
    // isPendingFilters,
    toggleStyle,
    buttonText,
    toggleOpen,
    isOpen,
    applyFilters,
    clearFilters,
    isDisabledApply,
    isDisabledClear,
  } = useFilterToggler();

  const PRIMARY_BUTTON_CLASS = 'cursor-pointer';

  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          startContent={<FilterIcon />}
          style={toggleStyle}
          onClick={toggleOpen}
          // TEMP: disabled until contents get fixed
          isDisabled
          // isDisabled={!initializedFilters || isPendingFilters}
          className="px-3"
        >
          {buttonText}
        </Button>
        {countSection}
      </div>

      {isOpen && (
        <>
          {children}

          <div className="flex gap-4">
            <PrimaryButton
              text="Apply Filters"
              className={PRIMARY_BUTTON_CLASS}
              onClick={applyFilters}
              isDisabled={isDisabledApply}
            />
            <Button onClick={clearFilters} isDisabled={isDisabledClear}>
              Clear Filters
            </Button>
          </div>
        </>
      )}
    </>
  );
};
