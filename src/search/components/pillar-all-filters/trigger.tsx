'use client';

import { Button } from '@heroui/button';
import { useSetAtom } from 'jotai';

import { CaretRightIcon } from '@/shared/components/icons/caret-right-icon';

import { isActiveAllFiltersAtom } from '@/search/core/atoms';
import { usePillarFilters } from '@/search/hooks/use-pillar-filters';

interface Props {
  nav: string;
}

export const PillarAllFiltersTrigger = ({ nav }: Props) => {
  const { data } = usePillarFilters(nav);
  const setIsActive = useSetAtom(isActiveAllFiltersAtom);
  const toggle = () => setIsActive((prev) => !prev);

  return (
    <Button endContent={<CaretRightIcon />} isDisabled={!data} onClick={toggle}>
      All Filters
    </Button>
  );
};
