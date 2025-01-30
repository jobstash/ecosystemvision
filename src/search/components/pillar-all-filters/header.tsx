'use client';

import { useMemo } from 'react';

import { Button } from '@heroui/button';
import { useAtomValue } from 'jotai';

import { Divider } from '@/shared/components/divider';

import { currentFilterParamsAtom } from '@/search/core/atoms';

import { CloseButton } from './close-button';

interface Props {
  activeSearchParams: Record<string, string>;
}

export const PillarAllFiltersHeader = ({ activeSearchParams }: Props) => {
  const currentFilterParams = useAtomValue(currentFilterParamsAtom);

  const isDisabled = useMemo(() => {
    const activeValues = Object.values(activeSearchParams).sort();
    const currentValues = Object.values(currentFilterParams).sort();
    return JSON.stringify(activeValues) === JSON.stringify(currentValues);
  }, [activeSearchParams, currentFilterParams]);

  return (
    <div className="sticky top-0 z-50 space-y-4 bg-neutral-900 pt-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">All Filters</h2>
          <Button size="sm" isDisabled={isDisabled}>
            Clear
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button size="sm" isDisabled={isDisabled}>
            Apply Filters
          </Button>
          <CloseButton />
        </div>
      </div>
      <Divider />
    </div>
  );
};
