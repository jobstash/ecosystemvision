'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@heroui/button';
import { Skeleton } from '@heroui/skeleton';
import { ArrowDownWideNarrowIcon, ArrowUpWideNarrowIcon, ListFilterIcon } from 'lucide-react';

import { PillarSelectFilterDto } from '@/search/core/schemas';
import { usePillarFilters } from '@/search/hooks/use-pillar-filters';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

interface Props {
  nav: string;
}

export const PillarOrderButton = ({ nav }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startTransition } = usePillarRoutesContext();
  const { data } = usePillarFilters(nav);

  const orderFilter = data?.find(
    (item): item is PillarSelectFilterDto => item.kind === 'ORDER',
  );

  if (!orderFilter) return <Skeleton className="h-10 w-[100px] rounded-xl" />;

  const currentOrder = searchParams.get(orderFilter.paramKey);
  const currentIndex = currentOrder
    ? orderFilter.options.findIndex((option) => option.value === currentOrder) + 1
    : 0;

  const getDisplayValues = () => {
    if (currentIndex === 0) {
      return { text: 'Order', Icon: ListFilterIcon, size: 18 };
    }

    const isDescending = currentIndex === 2;
    return {
      text: orderFilter.options[currentIndex - 1].label,
      Icon: isDescending ? ArrowDownWideNarrowIcon : ArrowUpWideNarrowIcon,
      size: 22,
    };
  };

  const handleOrderChange = () => {
    const nextIndex = (currentIndex + 1) % 3;
    const newParams = new URLSearchParams(searchParams);

    if (nextIndex === 0) {
      newParams.delete(orderFilter.paramKey);
    } else {
      const option = orderFilter.options[nextIndex - 1];
      newParams.set(orderFilter.paramKey, option.value);
    }

    startTransition(() => {
      router.push(`${pathname}${newParams.toString() ? `?${newParams}` : ''}`);
    });
  };

  const { text, Icon, size } = getDisplayValues();

  return (
    <Button
      className="min-w-[96px]"
      endContent={<Icon size={size} />}
      onClick={handleOrderChange}
    >
      {text.replace(/-/g, ' - ')}
    </Button>
  );
};