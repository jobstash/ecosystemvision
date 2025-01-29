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
import { usePillarFilters } from '@/search/hooks/use-pillar-filters';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  nav: string;
}

export const PillarSortByButton = ({ nav }: Props) => {
  const { data } = usePillarFilters(nav);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startTransition } = usePillarRoutesContext();

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

    isActive
      ? newParams.delete(orderByFilter.paramKey)
      : newParams.set(orderByFilter.paramKey, value);

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
