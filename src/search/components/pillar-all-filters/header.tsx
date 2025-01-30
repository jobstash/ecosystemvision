'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@heroui/button';
import { useAtomValue, useSetAtom } from 'jotai';

import { Divider } from '@/shared/components/divider';

import {
  currentFilterParamsAtom,
  isActiveAllFiltersAtom,
} from '@/search/core/atoms';

import { CloseButton } from './close-button';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  nav: string;
  activeSearchParams: Record<string, string>;
}

export const PillarAllFiltersHeader = ({ nav, activeSearchParams }: Props) => {
  const currentFilterParams = useAtomValue(currentFilterParamsAtom);
  const setIsActiveAllFilters = useSetAtom(isActiveAllFiltersAtom);

  const hasChanges = useMemo(() => {
    const activeParams = parseCsvParams(activeSearchParams);
    const currentParams = parseCsvParams(currentFilterParams);

    const activeValues = Object.values(activeParams).flat();
    const currentValues = Object.values(currentParams).flat();

    return (
      currentValues.length !== activeValues.length ||
      currentValues.some((value) => !activeValues.includes(value))
    );
  }, [activeSearchParams, currentFilterParams]);

  const router = useRouter();
  const params = useParams();
  const { isPendingPillarRoute, startTransition } = usePillarRoutesContext();
  const onApply = () => {
    // Remove params.pillar and params.item from the currentFilterParams
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(currentFilterParams)) {
      const isMainPillar = key === params.pillar;
      const newValue = isMainPillar
        ? value
            .split(',')
            .filter((item) => item !== params.item)
            .join(',')
        : value;

      if (newValue) {
        searchParams.set(key, newValue);
      }
    }

    const query = searchParams.size > 0 ? `?${searchParams.toString()}` : '';
    const path = `/${nav}/${params.pillar}/${params.item}${query}`;

    setIsActiveAllFilters(false);
    startTransition(() => {
      router.push(path);
    });
  };

  const isDisabled = isPendingPillarRoute || !hasChanges;

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
          <Button size="sm" isDisabled={isDisabled} onClick={onApply}>
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
