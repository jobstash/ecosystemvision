'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@heroui/button';
import { useAtom } from 'jotai';

import { normalizeString } from '@/shared/utils/normalize-string';
import { Divider } from '@/shared/components/divider';

import {
  currentFilterParamsAtom,
  isActiveAllFiltersAtom,
  PillarFilterState,
} from '@/search/core/atoms';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

interface Props {
  nav: string;
  activeSearchParams: Record<string, string>;
  onClear: () => void;
}

export const PillarAllFiltersHeader = ({
  nav,
  activeSearchParams,
  onClear,
}: Props) => {
  const [currentFilterParams] = useAtom(currentFilterParamsAtom);
  const [, setIsActiveAllFilters] = useAtom(isActiveAllFiltersAtom);

  const { activeParams, currentParams } = useMemo(() => {
    const activeParams = parseCsvParams(activeSearchParams);
    const currentParams = parseCsvParams(stateToParams(currentFilterParams));

    return { activeParams, currentParams };
  }, [activeSearchParams, currentFilterParams]);

  const hasChanges = useMemo(() => {
    const activeValues = Object.values(activeParams).flat().sort();
    const currentValues = Object.values(currentParams).flat().sort();

    return JSON.stringify(activeValues) !== JSON.stringify(currentValues);
  }, [activeParams, currentParams]);

  const router = useRouter();
  const params = useParams();
  const { isPendingRoute: isPendingPillarRoute, startTransition } =
    usePendingRoute();
  const onApply = () => {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(currentParams)) {
      const isMainPillar = key === params.pillar;
      const newValue =
        isMainPillar && Array.isArray(value)
          ? value.filter((item) => item !== params.item)
          : value;

      if (newValue.length > 0) {
        searchParams.set(key, newValue.join(','));
      }
    }

    const query = searchParams.size > 0 ? `?${searchParams.toString()}` : '';

    const isPillarPage = params.pillar && params.item;
    const pathPrefix = isPillarPage
      ? `/${nav}/${params.pillar}/${params.item}`
      : `/${nav}`;

    const path = `${pathPrefix}${query}`;

    setIsActiveAllFilters(false);
    startTransition(() => {
      router.push(path);
    });
  };

  const onClose = () => {
    onClear();
    setIsActiveAllFilters(false);
  };

  const isDisabled = isPendingPillarRoute || !hasChanges;

  return (
    <div className="sticky top-0 z-50 space-y-4 bg-neutral-900 pt-8">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-bold">All Filters</h2>
        <div className="flex items-center gap-4">
          <Button size="sm" isDisabled={isDisabled} onClick={onApply}>
            Apply Filters
          </Button>
          <Button isIconOnly size="sm" onClick={onClose}>
            X
          </Button>
        </div>
      </div>
      <Divider />
    </div>
  );
};

const parseCsvParams = (
  params: Record<string, string>,
): Record<string, string[]> => {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => !!value)
      .map(([key, value]) => [key, value.split(',').filter(Boolean)]),
  );
};

const stateToParams = (state: PillarFilterState) => {
  return Object.fromEntries(
    Object.entries(state).map(([key, value]) => [
      key,
      value.current?.map((v) => normalizeString(v)).join(',') || value.init,
    ]),
  );
};
