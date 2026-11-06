'use client';

import { Button } from '@heroui/react';

import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { useAppHeaderContext } from './context';

export const SearchTriggerButton = () => {
  const { showInput, toggleInput } = useAppHeaderContext();

  if (showInput) return null;

  return (
    <div className="ml-auto">
      <Button aria-label="Open search" className="w-[200px]" onPress={toggleInput}><SearchIcon /></Button>
    </div>
  );
};
