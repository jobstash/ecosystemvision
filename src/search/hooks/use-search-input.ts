import { useAtom } from 'jotai';

import { searchQueryAtom } from '@/search/core/atoms';

export const useSearchInput = () => {
  const [value, setValue] = useAtom(searchQueryAtom);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const onClear = () => setValue('');

  return {
    value,
    onChange,
    onClear,
  };
};
