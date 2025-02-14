'use client';

import { useState } from 'react';

import { Slider } from '@heroui/slider';
import { useAtom } from 'jotai';

import { formatNumber } from '@/shared/utils/format-number';

import { PillarRangeFilterValueDto } from '@/search/core/schemas';
import { currentFilterParamsAtom } from '@/search/core/atoms';

const SLIDER_MARKS = [0, 20, 40, 60, 80, 100];

interface Props {
  label: string;
  min: PillarRangeFilterValueDto;
  max: PillarRangeFilterValueDto;
  prefix: string | null;
}

export const RangeFilter = (props: Props) => {
  const { label, min, max, prefix } = props;

  const [, setCurrentFilterParams] = useAtom(currentFilterParamsAtom);

  const step = (max.value - min.value) / 100;

  const defaultValue = [min.value + step * 30, max.value - step * 30];

  const [value, setValue] = useState(defaultValue);

  const marks = SLIDER_MARKS.map((mark) => {
    const value = max.value * (mark / 100);
    return {
      value,
      label: formatItemValue(prefix, value),
    };
  });

  const onChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue(value);
    }

    setCurrentFilterParams((prev) => ({
      ...prev,
      [min.paramKey]: {
        init: (value as number[])[0]!.toString(),
      },
      [max.paramKey]: {
        init: (value as number[])[1]!.toString(),
      },
    }));
  };

  return (
    <Slider
      size="sm"
      className="px-4"
      label={label}
      minValue={min.value}
      maxValue={max.value}
      step={step}
      marks={marks}
      getValue={(value) => {
        const minLabel = formatItemValue(prefix, (value as number[])[0]);
        const maxLabel = formatItemValue(prefix, (value as number[])[1]);
        return `${minLabel} - ${maxLabel}`;
      }}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    />
  );
};

const formatItemValue = (prefix: string | null, value: number) => {
  const formattedValue = formatNumber(value);
  return prefix ? `${prefix}${formattedValue}` : formattedValue;
};
