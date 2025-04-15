'use client';

import { useRef } from 'react';

import { cn } from '@/shared/utils/cn';

import { usePillarSearchInput } from './use-pillar-search-input';

const PLACEHOLDER = 'Search ...';

interface Props {
  isFullWidth: boolean;
}

export const PillarSearchInput = ({ isFullWidth }: Props) => {
  const { width, value, onChange, onFocus, onBlur } = usePillarSearchInput();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && inputRef.current) {
      inputRef.current.blur();
      onBlur();
    }
  };

  return (
    <div className={cn('inline-block p-1', { 'w-full': isFullWidth })}>
      <input
        id="search-input"
        ref={inputRef}
        type="text"
        placeholder={PLACEHOLDER}
        className="border-none bg-transparent text-sm text-white focus:outline-none"
        style={{
          width: isFullWidth ? '100%' : width,
        }}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        // onBlur={onBlur}
      />
    </div>
  );
};
