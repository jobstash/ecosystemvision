'use client';

import { useSetAtom } from 'jotai';

import { isActiveSearchAtom } from '@/search/core/atoms';
import { useSearchInput } from '@/search/hooks/use-search-input';

const MIN_WIDTH = 72;
const MAX_WIDTH = 160;
const CHAR_WIDTH = 6;

const PLACEHOLDER = 'Search ...';

export const PillarSearchInput = () => {
  const { value, onChange } = useSearchInput();
  const setIsFocused = useSetAtom(isActiveSearchAtom);

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const dynamicWidth = Math.max(
    MIN_WIDTH,
    Math.min(MAX_WIDTH, (value.length + 1) * CHAR_WIDTH),
  );

  return (
    <div className="inline-block p-1">
      <input
        type="text"
        placeholder={PLACEHOLDER}
        className="border-none bg-transparent text-sm text-white focus:outline-none"
        style={{
          width: `${dynamicWidth}px`,
        }}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
};
