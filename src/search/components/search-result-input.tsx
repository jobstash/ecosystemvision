'use client';

import { useEffect, useRef } from 'react';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Spinner } from '@heroui/spinner';
import { useAtom } from 'jotai';

import { useAppHeaderContext } from '@/shared/components/app-header/context';
import { CloseIcon } from '@/shared/components/icons/close-icon';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { isActiveSearchAtom } from '@/search/core/atoms';
import { useSearchInput } from '@/search/hooks/use-search-input';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

export const SearchResultInput = () => {
  const { isPendingRoute: isPendingPillarRoute } = usePendingRoute();
  const { toggleInput } = useAppHeaderContext();

  const [isActiveSearch, setIsActiveSearch] = useAtom(isActiveSearchAtom);
  const onFocus = () => setIsActiveSearch(true);
  const onBlur = () => setIsActiveSearch(false);

  const { value, onChange, onClear } = useSearchInput();

  const onClose = () => {
    onClear();
    toggleInput();
    setIsActiveSearch(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && inputRef.current) {
      inputRef.current.blur();
      onBlur();
    }
  };

  return (
    <Input
      ref={inputRef}
      placeholder="Search ..."
      startContent={
        isPendingPillarRoute ? (
          <Spinner size="sm" color="white" />
        ) : (
          <div className="shrink-0">
            <SearchIcon />
          </div>
        )
      }
      radius="sm"
      classNames={{
        input: 'focus:ring-red-500 focus:border-red-500',
      }}
      endContent={
        isPendingPillarRoute || !isActiveSearch ? null : (
          <Button
            isIconOnly
            size="sm"
            onClick={onClose}
            variant="light"
            className="bg-white/5"
          >
            <CloseIcon />
          </Button>
        )
      }
      isDisabled={isPendingPillarRoute}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
    />
  );
};
