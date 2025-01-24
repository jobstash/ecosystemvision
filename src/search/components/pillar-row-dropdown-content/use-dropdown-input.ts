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
}

export const useDropdownInput = ({ nav, pillar }: Options) => {
  const queryClient = useQueryClient();
  const { isPendingPillarRoute } = usePillarRoutesContext();

  const [value, setValue] = useState('');
  const { debouncedValue, isPending: isPendingDebounce } =
    useAdvancedDebouncedValue(value, DEBOUNCE_DELAY);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const list = useAsyncList<string, number>({
    async load({ cursor = ITEMS_PER_PAGE, filterText }) {
      const pageOffset = !debouncedValue ? 1 : 0;
      const page = Math.floor(cursor / ITEMS_PER_PAGE) + pageOffset;

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
    if (debouncedValue) {
      list.reload();
      list.setFilterText(debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const onClear = () => {
    setValue('');
    list.reload();
    list.setFilterText('');
  };

  const placeholder = list.isLoading
    ? 'Loading more items ...'
    : `Search ${pillar} ...`;

  const { ref: inViewRef } = useInView({
    threshold: 0.4,
    onChange(inView) {
      if (inView && !list.error) {
        list.loadMore();
      }
    },
  });

  return {
    placeholder,
    isLoadingRoute: isPendingPillarRoute,
    value,
    onChange,
    list,
    onClear,
    inViewRef,
    isPendingDebounce,
  };
};
