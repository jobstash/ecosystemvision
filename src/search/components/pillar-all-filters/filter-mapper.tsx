import { PillarFiltersItemDto } from '@/search/core/schemas';
import { BooleanFilter } from '@/search/components/pillar-all-filters/boolean-filter';
import { CheckboxFilter } from '@/search/components/pillar-all-filters/checkbox-filter';
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

      if (hasFewOptions) {
        return <CheckboxFilter label={item.label} items={item.options} />;
      }
      return <SingleSelectFilter />;
    }

    case 'MULTI_SELECT': {
      if (item.options.length === 0) return null;

      if (hasFewOptions) {
        return <CheckboxFilter label={item.label} items={item.options} />;
      }

      throw new Error(
        `${item.label} has too many options. should be converted to a pillar`,
      );
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
