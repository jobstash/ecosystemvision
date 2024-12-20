import { useEffect, useState } from 'react';

import { useSetAtom } from 'jotai';

import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';

import { searchQueryAtom } from '@/search/core/atoms';

const DEBOUNCE_DELAY = 500;

export const useSearchInput = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebouncedValue(inputValue, DEBOUNCE_DELAY);
  const setSearchQuery = useSetAtom(searchQueryAtom);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };


  const onClear = () => {
    setSearchQuery('')
    setInputValue('');
  };

  return {
    value: inputValue,
    onChange,
    onClear,
  };
};
