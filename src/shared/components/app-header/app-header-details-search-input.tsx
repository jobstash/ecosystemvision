'use client';

import { useEffect } from 'react';
import { useRef } from 'react';

import { Button, InputGroup, Spinner } from '@heroui/react';
import { useAtom } from 'jotai';

import { useAppHeaderContext } from '@/shared/components/app-header/context';
import { CloseIcon } from '@/shared/components/icons/close-icon';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { isActiveSearchAtom } from '@/search/core/atoms';
import { useSearchInput } from '@/search/hooks/use-search-input';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

export const AppHeaderDetailsSearchInput = () => {
  const { isPendingRoute: isPendingPillarRoute } = usePendingRoute();
  const { toggleInput } = useAppHeaderContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useAtom(isActiveSearchAtom);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  useEffect(() => {
    if (inputRef.current && !isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const { value, onChange, onClear } = useSearchInput();

  const onClose = () => {
    onClear();
    toggleInput();
  };

  return (
    <InputGroup className="rounded-lg">
      <InputGroup.Prefix>
        {isPendingPillarRoute ? <Spinner size="sm" color="current" /> : <SearchIcon />}
      </InputGroup.Prefix>
      <InputGroup.Input
        ref={inputRef}
        aria-label="Search"
        placeholder="Search ..."
        className="focus:border-red-500 focus:ring-red-500"
        disabled={isPendingPillarRoute}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <InputGroup.Suffix>
        {!isPendingPillarRoute && (
          <Button isIconOnly aria-label="Close search" size="sm"
            onPress={onClose} variant="ghost" className="bg-white/5">
            <CloseIcon />
          </Button>
        )}
      </InputGroup.Suffix>
    </InputGroup>
  );
};
