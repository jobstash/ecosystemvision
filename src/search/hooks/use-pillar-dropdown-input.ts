import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAsyncList } from 'react-stately';

import { useQueryClient } from '@tanstack/react-query';

import { useAdvancedDebouncedValue } from '@/shared/hooks/use-advanced-debounced-value';

import { searchQueryKeys } from '@/search/core/query-keys';
import { GetPillarItemsProps } from '@/search/core/types';
import { getPillarItems } from '@/search/data/get-pillar-items';

import { usePillarRoutesContext } from '@/search/state/contexts/pillar-routes-context';

const ITEMS_PER_PAGE = 20;
const DEBOUNCE_DELAY = 500;

interface Options {
  nav: string;
  pillar: string;
  hasOffset?: boolean;
}

export const usePillarDropdownInput = ({
  nav,
  pillar,
  hasOffset = true,
}: Options) => {
  const queryClient = useQueryClient();
  const { isPendingPillarRoute } = usePillarRoutesContext();

  const [value, setValue] = useState('');
  const { debouncedValue, isPending: isPendingDebounce } =
    useAdvancedDebouncedValue(value, DEBOUNCE_DELAY);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onChangeValue = (value: string) => {
    setValue(value);
  };

  const list = useAsyncList<string, number>({
    async load({ cursor = ITEMS_PER_PAGE, filterText }) {
      const pageOffset = !debouncedValue ? 1 : 0;
      const currentPage = Math.floor(cursor / ITEMS_PER_PAGE);
      const page = hasOffset ? currentPage + pageOffset : currentPage;

      const queryProps: GetPillarItemsProps = {
        nav,
        pillar,
        query: filterText || undefined,
        page,
        limit: ITEMS_PER_PAGE,
      };

      const responseItems = await queryClient.fetchQuery({
        queryKey: searchQueryKeys.getPillarItems(queryProps),
        queryFn: async () => getPillarItems(queryProps),
      });

      const start = cursor || ITEMS_PER_PAGE;
      const nextCursor = start + ITEMS_PER_PAGE;

      return {
        items: responseItems,
        cursor: nextCursor,
      };
    },
  });

  useEffect(() => {
    list.reload();
    list.setFilterText(debouncedValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const onClear = () => {
    setValue('');
    list.reload();
    list.setFilterText('');
  };

  const { ref: inViewRef } = useInView({
    threshold: 0.4,
    onChange(inView) {
      if (inView && !list.error && list.items.length % ITEMS_PER_PAGE === 0) {
        list.loadMore();
      }
    },
  });

  return {
    isLoadingRoute: isPendingPillarRoute,
    value,
    onChange,
    onChangeValue,
    list,
    onClear,
    inViewRef,
    isPendingDebounce,
  };
};
