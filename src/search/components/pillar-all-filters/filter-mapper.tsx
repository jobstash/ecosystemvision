import { PillarFiltersItemDto } from '@/search/core/schemas';
import { BooleanFilter } from '@/search/components/pillar-all-filters/boolean-filter';
import { CheckboxFilter } from '@/search/components/pillar-all-filters/checkbox-filter';
import { MultiSelectFilter } from '@/search/components/pillar-all-filters/multi-select-filter';
import { RangeFilter } from '@/search/components/pillar-all-filters/range-filter';

interface Props {
  item: PillarFiltersItemDto;
}

export const FilterMapper = ({ item }: Props) => {
  switch (item.kind) {
    case 'SINGLE_SELECT': {
      if (item.options.length === 0) return null;

      const isBoolean =
        item.options.length === 2 &&
        item.options.every((option) => typeof option.value === 'boolean');

      if (isBoolean) {
        return (
          <BooleanFilter
            label={item.label}
            items={item.options}
            paramKey={item.paramKey}
          />
        );
      }

      return (
        <CheckboxFilter
          label={item.label}
          items={item.options}
          paramKey={item.paramKey}
        />
      );
    }

    case 'MULTI_SELECT': {
      if (item.options.length === 0) return null;

      return (
        <MultiSelectFilter
          label={item.label}
          items={item.options}
          paramKey={item.paramKey}
        />
      );
    }

    case 'RANGE': {
      const isInvalid = item.min.value >= item.max.value;
      if (isInvalid) return null;

      return (
        <RangeFilter
          label={item.label}
          min={item.min}
          max={item.max}
          prefix={item.prefix}
        />
      );
    }

    default: {
      return null;
    }
  }
};
