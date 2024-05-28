'use client';

import { useState } from 'react';

import { MultiSelect } from '@mantine/core';
import { useAtom } from 'jotai';

import { JOB_SENIORITY_MAP } from '@/shared/core/constants';
import { getCountText } from '@/shared/utils/get-count-text';
import { normalizeString } from '@/shared/utils/normalize-string';

import { MultiSelectFilterConfig } from '@/filters/core/schemas';
import { useFiltersContext } from '@/filters/providers/filters-provider/context';

// e.g. '2' would be key, and 'Junior' would be the value
const seniorityMap = new Map(
  Object.entries(JOB_SENIORITY_MAP).map(([key, value]) => [value, key]),
);
const SENIORITY_OPTIONS = Array.from(seniorityMap.values());
type SeniorityMapKey =
  (typeof JOB_SENIORITY_MAP)[keyof typeof JOB_SENIORITY_MAP];

// Handles current filter param values in url
const getInitialValues = (
  props: MultiSelectInputProps,
  isSeniority: boolean,
) => {
  const {
    config: { options: configOptions },
    paramValue,
  } = props;

  // Derive original string from normalized values
  const normalizedMap = new Map();
  for (const option of configOptions) {
    normalizedMap.set(normalizeString(option), option);
  }
  const initialValues: string[] = [];
  const paramValues = paramValue.split(',');
  for (const v of paramValues) {
    // Handle seniority mapping - otherwise do normalized mapping
    if (isSeniority) {
      const value = seniorityMap.get(v as SeniorityMapKey);
      if (value) {
        initialValues.push(value);
      }
    } else if (normalizedMap.has(v)) {
      initialValues.push(normalizedMap.get(v));
    }
  }

  return initialValues;
};

export const useMultiSelectInput = (props: MultiSelectInputProps) => {
  const {
    config: { label: configLabel, paramKey, options: configOptions },
  } = props;
  const isSeniority = paramKey === 'seniority';

  const initialValues = getInitialValues(props, isSeniority);

  const [value, setValue] = useState<string[]>(initialValues);

  const { atom } = useFiltersContext();
  const [filterParams, setFilterParms] = useAtom(atom);

  const onChange = (newValue: string[]) => {
    setValue(newValue);

    // Map values into normalized string
    const normalizedValues = newValue
      .map((v) => {
        if (isSeniority) {
          return JOB_SENIORITY_MAP[v as keyof typeof JOB_SENIORITY_MAP];
        } else {
          return normalizeString(v);
        }
      })
      .filter(Boolean) as string[];
    const hasValues = normalizedValues.length > 0;

    // Update filter params if has values, otherwise clear
    const newFilterParams = new URLSearchParams(filterParams);
    hasValues
      ? newFilterParams.set(paramKey, normalizedValues.join(','))
      : newFilterParams.delete(paramKey);
    setFilterParms(newFilterParams);
  };

  const label = getCountText(configLabel, value.length);
  const options = isSeniority ? SENIORITY_OPTIONS : configOptions;

  return {
    label,
    value,
    options,
    onChange,
  };
};

interface MultiSelectInputProps {
  config: MultiSelectFilterConfig;
  paramValue: string;
}

export const MultiSelectInput = (props: MultiSelectInputProps) => {
  const { label, value, options, onChange } = useMultiSelectInput(props);

  return (
    <MultiSelect
      searchable
      hidePickedOptions
      // We'll use label as placeholder for now.
      // Later on we'll refactor other filter components too look the same.
      placeholder={label}
      size="lg"
      classNames={{
        input:
          'bg-darkest-gray border-none rounded-lg text-white/80 text-base ',
        inputField: 'placeholder:text-base',
        dropdown: 'bg-darkest-gray border-none text-white/80',
        option: 'text-base hover:bg-dark-gray',
        pill: 'bg-dark-gray text-white/80 text-sm',
      }}
      data={options}
      value={value}
      onChange={onChange}
    />
  );
};
