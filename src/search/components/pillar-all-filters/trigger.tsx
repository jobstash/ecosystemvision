'use client';

import { Button } from '@heroui/button';
import { useSetAtom } from 'jotai';

import { CaretRightIcon } from '@/shared/components/icons/caret-right-icon';

import { GetPillarFiltersProps } from '@/search/core/types';
import { isActiveAllFiltersAtom } from '@/search/core/atoms';
import { usePillarFilters } from '@/search/hooks/use-pillar-filters';

export const PillarAllFiltersTrigger = (props: GetPillarFiltersProps) => {
  const { data } = usePillarFilters(props);
  const setIsActive = useSetAtom(isActiveAllFiltersAtom);
  const toggle = () => setIsActive((prev) => !prev);

  return (
    <Button endContent={<CaretRightIcon />} isDisabled={!data} onClick={toggle}>
      All Filters
    </Button>
  );
};
