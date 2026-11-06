'use client';

import { useEffect, useRef } from 'react';

import { Button, InputGroup, Spinner } from '@heroui/react';
import { useAtom } from 'jotai';

import { useAppHeaderContext } from '@/shared/components/app-header/context';
import { CloseIcon } from '@/shared/components/icons/close-icon';
import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { isActiveSearchAtom } from '@/search/core/atoms';
import { useSearchInput } from '@/search/hooks/use-search-input';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

interface Props {
  isAutoFocus?: boolean;
}

export const SearchResultInput = ({ isAutoFocus = true }: Props) => {
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
    if (inputRef.current && isAutoFocus) {
      inputRef.current.focus();
    }
  }, [isAutoFocus]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && inputRef.current) {
      inputRef.current.blur();
      onBlur();
    }
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
        onKeyDown={handleKeyDown}
      />
      <InputGroup.Suffix>
        {!isPendingPillarRoute && isActiveSearch && (
          <Button isIconOnly aria-label="Close search" size="sm"
            onPress={onClose} variant="ghost" className="bg-white/5">
            <CloseIcon />
          </Button>
        )}
      </InputGroup.Suffix>
    </InputGroup>
  );
};
