'use client';

import { useState } from 'react';

import { Slider, SliderValue } from '@nextui-org/slider';
import { TooltipProps } from '@nextui-org/tooltip';
import { useAtom } from 'jotai';

import { formatNumber } from '@/shared/utils/format-number';

import { RangeFilterConfig } from '@/filters/core/schemas';
import { useFiltersContext } from '@/filters/providers/filters-provider/context';

const LOWER_DEFAULT_MARK = 20;
const HIGHER_DEFAULT_MARK = 80;

const getInitValue = ({
  paramValue,
  step,
  minConfigValue,
  mark,
}: {
  paramValue: number;
  step: number;
  minConfigValue: number;
  mark: number;
}) => {
  if (isNaN(paramValue)) {
    // Get step multiple for min-value
    const minStepValue = Math.floor(minConfigValue / step) * step;

    // Default value using min-step-multiple and default mark
    return minStepValue + step * mark;
  }

  return paramValue;
};

const getFormatStyles = (
  prefix: string | null,
): Intl.NumberFormatOptions | undefined => {
  if (prefix === '$') {
    return { notation: 'compact', style: 'currency', currency: 'USD' };
  }
};

interface RangeInputProps {
  config: RangeFilterConfig;
  paramValues: { min: number; max: number };
}

const useRangeInput = (props: RangeInputProps) => {
  const { config, paramValues } = props;

  const {
    label,
    prefix,
    value: {
      lowest: { paramKey: minParamKey, value: minConfigValue },
      highest: { paramKey: maxParamKey, value: maxConfigValue },
    },
  } = config;

  const max = Math.round(maxConfigValue);
  const step = Math.round(max / 100);

  const minInitValue = getInitValue({
    paramValue: paramValues.min,
    step,
    minConfigValue,
    mark: LOWER_DEFAULT_MARK,
  });

  const maxInitValue = getInitValue({
    paramValue: paramValues.max,
    step,
    minConfigValue,
    mark: HIGHER_DEFAULT_MARK,
  });

  const [value, setValue] = useState<number[]>([minInitValue, maxInitValue]);

  const onChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
  };

  const { atom } = useFiltersContext();
  const [filterParams, setFilterParams] = useAtom(atom);

  // Set param values atom after change
  const onChangeEnd = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      const newParams = new URLSearchParams(filterParams);

      newParams.set(minParamKey, Math.round(newValue[0]).toString());
      newParams.set(maxParamKey, Math.round(newValue[1]).toString());

      setFilterParams(newParams);
    }
  };

  const getValue = (v: SliderValue) => {
    const prefixText = prefix ?? '';

    const min = Math.round((v as number[])[0]);
    const max = Math.round((v as number[])[1]);

    const minText = `${prefixText}${formatNumber(min)}`;
    const maxText = `${prefixText}${formatNumber(max)}`;

    return `${minText} - ${maxText}`;
  };

  const tooltipValueFormatOptions = getFormatStyles(prefix);

  return {
    label,
    step,
    maxValue: max,
    value,
    onChange,
    onChangeEnd,
    getValue,
    tooltipValueFormatOptions,
  };
};

const SLIDER_CLASSNAMES = {
  base: 'max-w-xs',
  filler: 'bg-gradient-to-l from-primary to-secondary',
  labelWrapper: 'mb-2',
  label: 'font-medium text-white/70 text-xs',
  value: 'font-medium text-xs',
  thumb: [
    'transition-size',
    'bg-gradient-to-l from-primary to-secondary',
    'data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20',
    'data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6',
  ],
  step: 'data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50 px-8',
  trackWrapper: 'pl-2',
};

const TOOLTIP_PROPS: Partial<TooltipProps> = {
  offset: 10,
  placement: 'bottom',
  classNames: {
    base: [
      // arrow color
      'before:bg-gradient-to-l before:from-secondary before:to-primary',
    ],
    content: [
      'py-2 shadow-xl',
      'font-semibold text-white bg-gradient-to-l from-primary to-secondary',
    ],
  },
};

export const RangeInput = (props: RangeInputProps) => {
  const {
    label,
    step,
    maxValue,
    value,
    onChange,
    onChangeEnd,
    getValue,
    tooltipValueFormatOptions,
  } = useRangeInput(props);

  return (
    <Slider
      size="sm"
      label={label}
      step={step}
      minValue={0}
      maxValue={maxValue}
      showTooltip={true}
      showOutline={true}
      disableThumbScale={true}
      value={value}
      onChange={onChange}
      onChangeEnd={onChangeEnd}
      getValue={getValue}
      classNames={SLIDER_CLASSNAMES}
      tooltipProps={TOOLTIP_PROPS}
      tooltipValueFormatOptions={tooltipValueFormatOptions}
    />
  );
};
