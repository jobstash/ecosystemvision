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
    const activeParams = parseCsvParams(activeSearchParams);
    const currentParams = parseCsvParams(currentFilterParams);

    const activeValues = Object.values(activeParams).flat();
    const currentValues = Object.values(currentParams).flat();

    return (
      currentValues.length === activeValues.length &&
      currentValues.every((value) => activeValues.includes(value))
    );
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

const parseCsvParams = (params: Record<string, string>) => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      value.split(',').filter(Boolean),
    ]),
  );
};
