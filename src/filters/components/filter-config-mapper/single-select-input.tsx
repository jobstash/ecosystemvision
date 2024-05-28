'use client';

import { useState } from 'react';

import { ComboboxItem, Select } from '@mantine/core';
import { useAtom } from 'jotai';

import { SingleSelectFilterConfig } from '@/filters/core/schemas';
import { useFiltersContext } from '@/filters/providers/filters-provider/context';

interface SingleSelectProps {
  config: SingleSelectFilterConfig;
  paramValue: string;
}

const useSingleSelectInput = (props: SingleSelectProps) => {
  const { config, paramValue } = props;
  const { label, options: configOptions, paramKey } = config;

  // Find option that matches paramValue and set as initial value
  const initialValue =
    configOptions.find((option) => option.value === paramValue)?.label ?? null;
  const [value, setValue] = useState(initialValue);

  const { atom } = useFiltersContext();
  const [filterParams, setFilterParams] = useAtom(atom);

  const onChange = (inputValue: string | null, option: ComboboxItem) => {
    setValue(inputValue ?? '');

    // Update filter params if has values, otherwise clear
    const newFilterParams = new URLSearchParams(filterParams);
    option && option.value
      ? newFilterParams.set(paramKey, option.value)
      : newFilterParams.delete(paramKey);

    // Save changes
    setFilterParams(newFilterParams);
  };

  return {
    label,
    value,
    options: configOptions.map((option) => ({
      ...option,
      value: `${option.value}`,
      disabled: false,
    })),
    onChange,
  };
};

export const SingleSelectInput = (props: SingleSelectProps) => {
  const { label, value, options, onChange } = useSingleSelectInput(props);

  return (
    <Select
      clearable
      placeholder={label}
      size="lg"
      classNames={{
        input:
          'bg-darkest-gray border-none rounded-lg text-white/80 text-base placeholder:text-base',
        dropdown: 'bg-darkest-gray border-none text-white/80',
        option: 'text-base hover:bg-dark-gray',
      }}
      data={options}
      value={value}
      onChange={onChange}
    />
  );
};
