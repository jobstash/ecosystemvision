'use client';

import { useEffect, useMemo, useState } from 'react';

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

  const [currentFilterParams, setCurrentFilterParams] = useAtom(
    currentFilterParamsAtom,
  );

  const step = (max.value - min.value) / 100;
  const selectedValue = useMemo(() => {
    const selectedMin = Number(
      currentFilterParams[min.paramKey]?.current?.[0] ?? min.value,
    );
    const selectedMax = Number(
      currentFilterParams[max.paramKey]?.current?.[0] ?? max.value,
    );
    return [
      Math.max(min.value, Math.min(selectedMin, max.value)),
      Math.max(min.value, Math.min(selectedMax, max.value)),
    ];
  }, [currentFilterParams, max, min]);
  const [value, setValue] = useState(selectedValue);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const marks = SLIDER_MARKS.map((mark) => {
    const value = min.value + (max.value - min.value) * (mark / 100);
    return {
      value,
      label: formatItemValue(prefix, value),
    };
  });

  const onChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue(value);
    }

    const [nextMin, nextMax] = value as number[];
    setCurrentFilterParams((prev) => {
      const next = { ...prev };

      if (nextMin <= min.value) delete next[min.paramKey];
      else {
        next[min.paramKey] = {
          init: prev[min.paramKey]?.init ?? '',
          current: [nextMin.toString()],
        };
      }

      if (nextMax >= max.value) delete next[max.paramKey];
      else {
        next[max.paramKey] = {
          init: prev[max.paramKey]?.init ?? '',
          current: [nextMax.toString()],
        };
      }

      return next;
    });
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
      value={value}
      onChange={onChange}
    />
  );
};

const formatItemValue = (prefix: string | null, value: number) => {
  const formattedValue = formatNumber(value);
  return prefix ? `${prefix}${formattedValue}` : formattedValue;
};
