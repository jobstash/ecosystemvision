'use client';

import { Button } from '@heroui/button';
import { useSetAtom } from 'jotai';

import { CaretRightIcon } from '@/shared/components/icons/caret-right-icon';

import { isActiveAllFiltersAtom } from '@/search/core/atoms';

export const PillarAllFiltersTrigger = () => {
  const setIsActive = useSetAtom(isActiveAllFiltersAtom);
  const toggle = () => setIsActive((prev) => !prev);

  return (
    <Button endContent={<CaretRightIcon />} onClick={toggle}>
      All Filters
    </Button>
  );
};
