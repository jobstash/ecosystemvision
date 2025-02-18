'use client';

import { useEffect, useRef } from 'react';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Spinner } from '@heroui/spinner';

import { CloseIcon } from '@/shared/components/icons/close-icon';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { useSearchInput } from '@/search/hooks/use-search-input';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

export const PlainSearchInput = () => {
  const { value, onChange, onClear } = useSearchInput();
  const { isPendingRoute: isPendingPillarRoute } = usePendingRoute();

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
      radius="sm"
      classNames={{
        input: 'focus:ring-red-500 focus:border-red-500',
      }}
      endContent={
        <>
          {isPendingPillarRoute && <Spinner size="sm" color="white" />}
          {value && (
            <Button
              isIconOnly
              size="sm"
              onClick={onClear}
              variant="light"
              className="bg-white/5"
            >
              <CloseIcon />
            </Button>
          )}
        </>
      }
      isDisabled={isPendingPillarRoute}
      value={value}
      onChange={onChange}
    />
  );
};
