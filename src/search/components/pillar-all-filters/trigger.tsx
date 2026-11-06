'use client';

import { Button } from '@heroui/react';
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
    <Button isDisabled={!data} onPress={toggle} >{props.nav === 'organizations' ? 'Team & All Filters' : 'All Filters'}{<CaretRightIcon />}</Button>
  );
};
