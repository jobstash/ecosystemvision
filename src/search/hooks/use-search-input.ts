import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { searchQueryAtom } from '@/search/core/atoms';

const DEBOUNCE_DELAY = 500;

export const useSearchInput = () => {
  const [{ actual }, setSearchQuery] = useAtom(searchQueryAtom);
  const debouncedValue = useDebouncedValue(actual, DEBOUNCE_DELAY);
  const setInputValue = (value: string) =>
    setSearchQuery((prev) => ({ ...prev, actual: value }));

  useEffect(() => {
    setSearchQuery((prev) => ({ ...prev, debounced: debouncedValue }));
  }, [debouncedValue, setSearchQuery]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const onClear = () => {
    setSearchQuery((prev) => ({ ...prev, actual: '' }));
  };

  return {
    value: actual,
    onChange,
    onClear,
  };
};
