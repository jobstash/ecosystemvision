import { Slider } from '@heroui/slider';

import { formatNumber } from '@/shared/utils/format-number';

const SLIDER_MARKS = [0, 20, 40, 60, 80, 100];

interface Props {
  label: string;
  minValue: number;
  maxValue: number;
  prefix: string | null;
}

export const RangeFilter = (props: Props) => {
  const { label, minValue, maxValue, prefix } = props;
  const step = (maxValue - minValue) / 100;
  const defaultValue = [minValue + step * 30, maxValue - step * 30] as [number, number];
  const marks = SLIDER_MARKS.map((mark) => {
    const value = maxValue * (mark / 100);
    return {
      value,
      label: formatItemValue(prefix, value),
    };
  });
  return (
    <Slider
      size="sm"
      label={label}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      defaultValue={defaultValue}
      marks={marks}
      getValue={(value) => {
        const minLabel = formatItemValue(prefix, (value as number[])[0]);
        const maxLabel = formatItemValue(prefix, (value as number[])[1]);
        return `${minLabel} - ${maxLabel}`;
      }}
    />
  );
};

const formatItemValue = (prefix: string | null, value: number) => {
  const formattedValue = formatNumber(value);
  return prefix ? `${prefix}${formattedValue}` : formattedValue;
};
