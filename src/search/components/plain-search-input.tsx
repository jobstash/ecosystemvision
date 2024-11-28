'use client';

import { useEffect, useRef } from 'react';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

import { CloseIcon } from '@/shared/components/icons/close-icon';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { useSearchInput } from '@/search/hooks/use-search-input';

export const PlainSearchInput = () => {
  const { value, onChange, onClear } = useSearchInput();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <Input
      ref={inputRef}
      placeholder="Search ..."
      startContent={
        <div className="shrink-0">
          <SearchIcon />
        </div>
      }
      endContent={
        value ? (
          <Button
            isIconOnly
            size="sm"
            onClick={onClear}
            variant="light"
            className="bg-white/5"
          >
            <CloseIcon />
          </Button>
        ) : null
      }
      radius="sm"
      classNames={{
        input: 'focus:ring-red-500 focus:border-red-500',
      }}
      value={value}
      onChange={onChange}
    />
  );
};
