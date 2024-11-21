'use client';

import { Button, Input } from '@nextui-org/react';

import { CloseIcon } from '@/shared/components/icons/close-icon';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { useSearchInput } from '@/search/hooks/use-search-input';

export const SearchInput = () => {
  const { value, onChange, onClear } = useSearchInput();

  return (
    <Input
      placeholder="Search ..."
      startContent={
        <div className="shrink-0">
          <SearchIcon />
        </div>
      }
      endContent={
        value ? (
          <div className="flex items-center gap-2">
            <span>Cancel</span>
            <Button isIconOnly size="sm" onClick={onClear}>
              <CloseIcon />
            </Button>
          </div>
        ) : null
      }
      radius="sm"
      value={value}
      onChange={onChange}
    />
  );
};
