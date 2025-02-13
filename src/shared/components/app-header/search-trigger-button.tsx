'use client';

import { Button } from '@heroui/button';

import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { useAppHeaderContext } from './context';

export const SearchTriggerButton = () => {
  const { showInput, toggleInput } = useAppHeaderContext();

  if (showInput) return null;

  return (
    <div className="ml-auto">
      <Button className="w-[200px]" onClick={toggleInput}>
        <SearchIcon />
      </Button>
    </div>
  );
};
