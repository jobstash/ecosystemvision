import { PillarFiltersItemDto } from '@/search/core/schemas';
import { CheckboxFilter } from '@/search/components/pillar-all-filters/checkbox-filter';
import { MultiSelectFilter } from '@/search/components/pillar-all-filters/multi-select-filter';
import { RangeFilter } from '@/search/components/pillar-all-filters/range-filter';
import { SingleSelectFilter } from '@/search/components/pillar-all-filters/single-select-filter';

interface Props {
  item: PillarFiltersItemDto;
}

export const FilterMapper = ({ item }: Props) => {
  const hasFewOptions =
    item.kind === 'RANGE' ? false : item.options.length <= 5;

  switch (item.kind) {
    case 'SINGLE_SELECT': {
      if (hasFewOptions) {
        return <CheckboxFilter label={item.label} items={item.options} />;
      }
      return <SingleSelectFilter />;
    }

    case 'MULTI_SELECT': {
      if (hasFewOptions) {
        return <CheckboxFilter label={item.label} items={item.options} />;
      }
      return <MultiSelectFilter />;
    }

    case 'RANGE': {
      return (
        <RangeFilter
          label={item.label}
          minValue={item.min.value}
          maxValue={item.max.value}
          prefix={item.prefix}
        />
      );
    }

    default: {
      return null;
    }
  }
};
