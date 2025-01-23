import { useEffect } from 'react';

import { useAtom, useSetAtom } from 'jotai';

import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { isActiveSearchAtom, searchQueryAtom } from '@/search/core/atoms';

const MIN_WIDTH = 72;
const MAX_WIDTH = 160;
const CHAR_WIDTH = 6;
const DEBOUNCE_DELAY = 500;

export const usePillarSearchInput = () => {
  const [{ actual }, setSearchQuery] = useAtom(searchQueryAtom);

  const dynamicWidth = Math.max(
    MIN_WIDTH,
    Math.min(MAX_WIDTH, (actual.length + 1) * CHAR_WIDTH),
  );

  const debouncedValue = useDebouncedValue(actual, DEBOUNCE_DELAY);

  useEffect(() => {
    setSearchQuery((prev) => ({ ...prev, debounced: debouncedValue }));
  }, [debouncedValue, setSearchQuery]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery((prev) => ({ ...prev, actual: e.target.value }));
  };

  const setIsFocused = useSetAtom(isActiveSearchAtom);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return {
    width: `${dynamicWidth}px`,
    value: actual,
    onChange,
    onFocus,
    onBlur,
  };
};
