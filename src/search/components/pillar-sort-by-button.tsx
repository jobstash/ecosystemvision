'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Skeleton } from '@heroui/skeleton';

import { cn } from '@/shared/utils/cn';
import { CaretDownIcon } from '@/shared/components/icons/caret-down-icon';
import { CheckmarkIcon } from '@/shared/components/icons/checkmark-icon';

import { PillarSelectFilterDto } from '@/search/core/schemas';
import { GetPillarFiltersProps } from '@/search/core/types';
import { usePillarFilters } from '@/search/hooks/use-pillar-filters';

import { usePendingRoute } from '@/shared/contexts/pending-route-context';

export const PillarSortByButton = (props: GetPillarFiltersProps) => {
  const { data } = usePillarFilters(props);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startTransition } = usePendingRoute();

  const orderByFilter = data?.find(
    (item): item is PillarSelectFilterDto => item.kind === 'ORDER_BY',
  );

  if (!orderByFilter) return <Skeleton className="h-10 w-[100px] rounded-xl" />;

  const currentSortValue = searchParams.get(orderByFilter.paramKey);
  const currentSortLabel = orderByFilter.options.find(
    (option) => option.value === currentSortValue,
  )?.label;

  const getQueryString = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const isActive = value === currentSortValue;
    const filterValue = orderByFilter.options
      .find(({ label }) => label === value)
      ?.value.toString();

    if (isActive) {
      newParams.delete(orderByFilter.paramKey);
    } else if (filterValue) {
      newParams.set(orderByFilter.paramKey, filterValue);
    }

    const newParamsString = newParams.toString();
    if (!newParamsString) return '';

    return `?${newParamsString}`;
  };

  const onAction = (key: React.Key) => {
    const queryString = getQueryString(`${key}`);
    startTransition(() => {
      router.push(`${pathname}${queryString}`);
    });
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button endContent={<CaretDownIcon />}>
          Sort By{currentSortLabel && `: ${currentSortLabel}`}
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Sort By" onAction={onAction}>
        {orderByFilter.options.map((option) => {
          const isActive = option.value === currentSortValue;
          const itemClasses = cn('py-3', {
            'text-accent2 font-bold bg-accent2/5 hover:bg-accent2/10': isActive,
          });

          return (
            <DropdownItem
              key={option.label}
              classNames={{ base: itemClasses }}
              endContent={isActive && <CheckmarkIcon />}
            >
              {option.label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};
