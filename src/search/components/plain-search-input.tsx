'use client';

import { useEffect, useRef } from 'react';

import { Button, InputGroup, Spinner } from '@heroui/react';

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
  }, []);

  return (
    <InputGroup className="rounded-lg">
      <InputGroup.Prefix><SearchIcon /></InputGroup.Prefix>
      <InputGroup.Input
        ref={inputRef}
        aria-label="Search"
        placeholder="Search ..."
        className="focus:border-red-500 focus:ring-red-500"
        disabled={isPendingPillarRoute}
        value={value}
        onChange={onChange}
      />
      <InputGroup.Suffix>
        {isPendingPillarRoute && <Spinner size="sm" color="current" />}
        {value && (
          <Button isIconOnly aria-label="Clear search" size="sm"
            onPress={onClear} variant="ghost" className="bg-white/5">
            <CloseIcon />
          </Button>
        )}
      </InputGroup.Suffix>
    </InputGroup>
  );
};
