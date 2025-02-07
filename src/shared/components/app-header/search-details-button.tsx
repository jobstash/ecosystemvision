'use client';

import { Button } from '@heroui/react';

import { SearchIcon } from '@/shared/components/icons/sidebar-search-icon';

import { useAppHeaderContext } from './context';

export const SearchDetailsButton = () => {
  const { isDetailsSearch, toggleDetailsSearch } = useAppHeaderContext();

  if (isDetailsSearch) return null;

  return (
    <Button className="w-[200px]" onClick={toggleDetailsSearch}>
      <SearchIcon />
    </Button>
  );
};
