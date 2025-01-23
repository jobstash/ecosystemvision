'use client';

import { usePillarSearchInput } from './use-pillar-search-input';

const PLACEHOLDER = 'Search ...';

export const PillarSearchInput = () => {
  const { width, value, onChange, onFocus, onBlur } = usePillarSearchInput();

  return (
    <div className="inline-block p-1">
      <input
        type="text"
        placeholder={PLACEHOLDER}
        className="border-none bg-transparent text-sm text-white focus:outline-none"
        style={{
          width,
        }}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};
